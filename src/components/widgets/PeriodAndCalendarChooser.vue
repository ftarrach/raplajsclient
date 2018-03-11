<template lang="pug">
  .container.period-and-calendar-chooser
    .columns
      .column.is-third
        calendar-chooser(:title="calendar"
                         v-model="resource")
      .column.is-third
        date-chooser(v-model="from"
                     :title="fromString")
      .column.is-third
        date-chooser(v-model="to"
                     :title="endString"
                     is-end)
</template>

<script>

import DateChooser from '@/components/widgets/DateChooser'
import CalendarChooser from '@/components/widgets/CalendarChooser'

export default {

  components: {
    DateChooser,
    CalendarChooser
  },

  data() {
    return {
      resource: null
    }
  },

  computed: {
    calendar() {
      return this.$store.getters['locale/localize']('calendar')
    },
    fromString() {
      return this.$store.getters['locale/localize']('start_date')
    },
    endString() {
      return this.$store.getters['locale/localize']('end_date')
    },
    from: {
      get() {
        return this.$store.state.calendar.startDate
      },
      set(value) {
        this.$store.dispatch('calendar/setStartDate', value)
      }
    },
    to: {
      get() {
        return this.$store.state.calendar.endDate
      },
      set(value) {
        this.$store.dispatch('calendar/setEndDate', value)
      }
    }
  }

}
</script>

<style scoped>
  .period-and-calendar-chooser {
    margin-bottom: 1em;
  }
</style>
