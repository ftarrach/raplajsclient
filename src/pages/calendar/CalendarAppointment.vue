<template lang="pug">
  .container.calendar-appointment
    period-and-calendar-chooser
    appointment-table
</template>

<script>
import AppointmentTable from '@/components/calendar/AppointmentTable'
import PeriodAndCalendarChooser from '@/components/widgets/PeriodAndCalendarChooser'

export default {

  components: {
    AppointmentTable,
    PeriodAndCalendarChooser
  },

  computed: {
    appointments() {
      return this.$store.getters.appointments
    }
  }

}
</script>

<style scoped>

  .calendar-appointment {
    margin-top: 2em;
    padding-bottom: 1em;
  }

</style>