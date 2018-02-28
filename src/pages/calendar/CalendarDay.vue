<template lang="pug">
  //-.container.calendar-day
    date-and-calendar-chooser(step="day")
    .flex
      calendar-day-legend
      div
      calendar-day-view(:date="day" :reservations="reservations")
</template>

<script>
import CalendarDayLegend from '@/components/calendar/calendarview/CalendarDayLegend'
import CalendarDayView from '@/components/calendar/calendarview/CalendarDayView'
import DateAndCalendarChooser from '@/components/widgets/DateAndCalendarChooser'

export default {
  components: {
    CalendarDayLegend,
    CalendarDayView,
    DateAndCalendarChooser
  },

  computed: {
  //   day() {
  //     return this.$store.state.user.date
  //   },
  //   reservations() {
  //     return this.$store.getters.reservationsOnDate
  //   }
  }
}
</script>

<style>
.calendar-day {
  margin-top: 1em;
  padding-bottom: 1em;
}

.flex {
  display: flex;
}
</style>
