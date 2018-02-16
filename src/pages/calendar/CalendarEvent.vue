<template lang="pug">
  .container.calendar-event
    period-and-calendar-chooser
    event-table
</template>

<script>

import EventTable from '@/components/calendar/EventTable'
import PeriodAndCalendarChooser from '@/components/widgets/PeriodAndCalendarChooser'

export default {

  components: {
    EventTable,
    PeriodAndCalendarChooser
  }

}
</script>

<style scoped>
  .calendar-event {
    margin-top: 1em;
    padding-bottom: 1em;
  }
</style>
