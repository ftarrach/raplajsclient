<template lang="pug">
  .container.calendar-day
    date-and-calendar-chooser(step="day")
    .flex
      calendar-legend
      day-appointments
</template>

<script>
import CalendarLegend from '@/components/calendar/CalendarLegend'
import DayAppointments from '@/components/calendar/DayAppointments'
import DateAndCalendarChooser from '@/components/widgets/DateAndCalendarChooser'

export default {
  components: {
    CalendarLegend,
    DayAppointments,
    DateAndCalendarChooser
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
