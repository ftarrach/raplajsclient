<template lang="pug">
  .calendar-week
    date-and-calendar-chooser
    p CalendarWeek
</template>

<script>
import DateAndCalendarChooser from '@/components/widgets/DateAndCalendarChooser'

export default {
  components: {
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
