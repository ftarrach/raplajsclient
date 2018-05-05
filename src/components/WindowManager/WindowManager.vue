<template lang="pug">
  v-dialog(value="true" fullscreen hide-overlay v-if="windows.length > 0")
    v-card
      v-toolbar(color="primary" dark)
        v-btn(icon @click="requestClose")
          v-icon close
        v-toolbar-title {{ currentWindow.title }}
        v-spacer
        responsive-button(
          flat
          v-for="action in currentWindow.actions"
          :key="action.label"
          @click="onAction(action)"
        )
          template(slot="icon")
            v-icon {{ action.icon }}
          template(slot="text") {{ action.label }}
      v-card-text
        keep-alive
          component(:is="currentWindow.component" v-bind="currentWindow.props")
</template>

<script>
import ReservationForm from '@/pages/ReservationForm/ReservationForm'
import Window from './Window'
import ResponsiveButton from '../ResponsiveButton/ResponsiveButton'
import Reservation from '@/types/Reservation'
import EventBus from '@/EventBus'

export default {
  name: 'WindowManager',

  components: {
    ResponsiveButton
  },

  data() {
    return {
      windows: [],
      currentId: null
    }
  },

  computed: {
    currentWindow() {
      if (this.currentId) {
        return this.windows.find(d => d.id === this.currentId)
      }
      if (this.windows.length > 0) {
        return this.windows[this.windows.length - 1]
      }
      return {}
    }
  },

  created() {
    if (window.api) {
      EventBus.$on('gwt-open-window', openWindow => {
        const gwtWindow = openWindow.window
        let title = openWindow.title
        let component = null
        let props = {gwtWindow}

        switch (gwtWindow.name) {
          case 'ReservationForm':
            component = ReservationForm
            props.reservation = Reservation.fromGwt(gwtWindow.reservation)
            break
        }
        this.openWindow(
          new Window({
            id: openWindow.windowId.getInfo(),
            title,
            component,
            props,
            actions: gwtWindow.getActions(),
            onClose: gwtWindow.onClose
          })
        )
      })
      EventBus.$on('gwt-remove-window', applicationEvent =>
        this.closeWindow(applicationEvent.getInfo())
      )
    }
  },

  methods: {
    openWindow(window) {
      this.windows.push(window)
      if (window.component.opened) window.component.opened()
    },

    requestClose() {
      if (window.api) {
        this.currentWindow.onClose()
      } else {
        if (this.currentId) {
          this.closeWindow(this.currentId)
        } else {
          this.closeWindow(this.windows[this.windows.length - 1].id)
        }
      }
    },

    jumpTo(id) {
      this.currentId = id
    },

    hasWindow(id) {
      return this.windows.find(d => d.id === id)
    },

    closeWindow(id) {
      console.log(`closing window with id ${id}`)
      const component = this.windows.find(d => d.id === id).component
      if (component.beforeClose) component.beforeClose()
      this.windows = this.windows.filter(d => d.id !== id)
      if (this.currentId === id) {
        this.currentId = null
      }
      if (component.closed) this.$nextTick(component.closed)
    },

    onAction(button) {
      console.time('action')
      button.action()
      console.timeEnd('action')
    }
  }
}
</script>