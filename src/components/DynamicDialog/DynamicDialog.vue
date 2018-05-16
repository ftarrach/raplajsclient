<template lang="pug">
  v-dialog(v-model="open" color="primary" persistent scrollable dark)
    v-card
      v-toolbar(color="primary" dark)
        v-spacer
        v-btn(@click="requestClose" icon)
          v-icon close
      v-card-text
        v-icon(v-if="icon" :icon="icon")
        dynamic-dialog-content(ref="dyn")
      v-card-actions
        v-btn(flat
              v-for="(button, index) in buttons"
              :key="index"
              @click="selected(index)") {{ button }}
</template>

<script>

import DynamicDialogContent from './DynamicDialogContent'
import { icons } from '@/gwtinterop/icons'
import EventBus from '@/EventBus'

export default {
  name: 'DynamicDialog',

  components: {
    DynamicDialogContent
  },

  data() {
    return {
      open: false,
      title: '',
      icon: '',
      buttons: []
    }
  },

  created() {
    EventBus.$on('gwt-dialog-open', this.openDialog)
    EventBus.$on('gwt-dialog-close', this.closeDialog)
  },

  methods: {
    openDialog(vueDialog) {
      this.title = vueDialog.getTitle()
      this.icon = icons[vueDialog.getIcon()]
      this.$refs.dyn.initialize(vueDialog.getContent())
      this.buttons = vueDialog.getButtonStrings()
      this.gwtPromise = vueDialog.getPromise()
      this.open = true
    },

    requestClose() {
      this.selected(-1)
    },

    closeDialog() {
      this.open = false
    },

    selected(index) {
      this.closeDialog()
      this.gwtPromise.complete(window.api.toInteger(index))
    }
  }

}
</script>
