<template lang="pug">
  v-toolbar(app clipped-left dense)
    v-toolbar-side-icon(@click.stop='hamburgerClick' v-if="$vuetify.breakpoint.mdAndDown")
    v-toolbar-title(v-text='title')
    v-spacer
    span.red--text {{ status }}
    v-toolbar-items.hidden-sm-and-down
      view-chooser(
        :value="currentView"
        :label="currentViewLabel",
        :views="views"
        @onChange="viewChosen"
      )
      calendar-chooser(
        :value="currentCalendar"
        :label="currentCalendarLabel"
        :calendars="calendars"
        @onChange="calendarChosen"
      )
    view-chooser.hidden-md-and-up(
      :value="currentView"
      :label="currentViewLabel",
      :views="views"
      @onChange="viewChosen"
    )
    calendar-chooser.hidden-md-and-up(
      :value="currentCalendar"
      :label="currentCalendarLabel"
      :calendars="calendars"
      @onChange="calendarChosen"
    )
</template>

<script>
import CalendarChooser from './CalendarChooser'
import ViewChooser from './ViewChooser'

export default {
  components: {
    CalendarChooser,
    ViewChooser
  },

  props: {
    title: { type: String, required: false, default: () => 'Rapla' },
    calendars: { type: Array, required: true }, // Array of Objects: {id, label}
    currentCalendar: { type: String, required: true }, // id of current calendar
    views: { type: Array, required: true }, // Array of Objects: {id, label}
    currentView: { type: String, required: true }
  },

  data() {
    return {
      status: ''
    }
  },

  computed: {
    currentCalendarLabel() {
      return this.currentCalendar ? this.currentCalendar : 'Default'
    },
    currentViewLabel() {
      return this.views.find(v => v.id === this.currentView).label
    }
  },

  created() {
    this.$root.$on('gwt-show-status-message', this.setStatus)
  },

  beforeDestroy() {
    this.$root.$off('gwt-show-status-message', this.setStatus)
  },

  methods: {
    setStatus(msg) {
      this.status = msg
    },

    hamburgerClick() {
      this.$emit('hamburgerClick')
    },

    calendarChosen(calendarId) {
      this.$emit('calendarChosen', calendarId)
    },

    viewChosen(viewId) {
      this.$emit('viewChosen', viewId)
    }
  }
}
</script>
