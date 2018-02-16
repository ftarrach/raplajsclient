<template lang="pug">
  .calendar-week
    date-and-calendar-chooser
    calendar-week-view
</template>

<script>
import CalendarWeekView from '@/components/calendar/calendarview/CalendarWeekView'
import DateAndCalendarChooser from '@/components/widgets/DateAndCalendarChooser'

export default {
  components: {
    CalendarWeekView,
    DateAndCalendarChooser
  }
}
</script>

<style scoped>
.calendar-week {
  margin-top: 1em;
  padding-bottom: 1em;
}
</style>
