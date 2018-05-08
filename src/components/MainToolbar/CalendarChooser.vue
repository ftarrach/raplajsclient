<template lang="pug">
  v-menu(:disabled="disabled")
    template(slot='activator')
      v-btn(flat :disabled="disabled").hidden-sm-and-down
        v-icon(small left) mdi-calendar-text
        span {{ label }}
        v-icon arrow_drop_down
      v-btn(icon :disabled="disabled").hidden-md-and-up
        v-icon mdi-calendar-text
    v-list
      template(v-for="calendar in calendars")
        chooser-item(
          :obj="calendar"
          :selected="calendar.id === value"
          @input="calendarChosen"
        )
</template>

<script>

import ChooserItem from './ChooserItem'

export default {

  components: {
    ChooserItem
  },

  props: {
    value: {
    },
    calendars: {
      type: Array, // array of {id, label}
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  methods: {
    calendarChosen(calendarId) {
      this.$emit('onChange', calendarId)
    }
  }
}
</script>
