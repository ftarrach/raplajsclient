<template lang="pug">
  .rapla-calendar
    calendar-day-legend
    calendar-day(:date="date" :reservations="reservations")
</template>

<script>
import CalendarDayLegend from "./calendarview/CalendarDayLegend";
import CalendarDay from "./calendarview/CalendarDay";
export default {
  name: "calendar-day-view",
  components: {
    CalendarDayLegend,
    CalendarDay
  },
  props: {
    date: {
      required: true
      // NOTE: type moment
    },
    reservations: {
      required: true
    }
  }
};
</script>

<style>
.rapla-calendar {
  display: flex;
}
</style>
