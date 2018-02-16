<template lang="pug">
  .container.date-and-calendar-chooser
    .columns
      .column
        calendar-chooser(title='Kalender'
                         v-model='calendar')
      .column
        date-chooser(v-model='date'
                     title='Datum'
                     :step='step')
</template>

<script>

import DateChooser from '@/components/widgets/DateChooser'
import CalendarChooser from '@/components/widgets/CalendarChooser'

export default {

  components: {
    DateChooser,
    CalendarChooser
  },

  props: {
    step: {
      type: String,
      default: 'week'
    }
  },

  data() {
    return {
      calendar: null
    }
  },

  computed: {
    date: {
      get() {
        return this.$store.state.user.date
      },
      set(newValue) {
        return this.$store.commit('updateDate', newValue)
      }
    }
  }
}
</script>

<style scoped>
  .date-and-calendar-chooser {
    margin-bottom: 1em;
  }
</style>
