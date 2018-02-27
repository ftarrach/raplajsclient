<template lang="pug">
  .rapla-calendar
    calendar-day-legend
    template(v-for="(d, index) in weekDates")
      calendar-day-view(:date="d"
                        :reservations="reservationsAt(d)")
</template>

<script>
import CalendarDayLegend from './CalendarDayLegend'
import CalendarDayView from './CalendarDayView'
// import moment from 'moment'

export default {

  components: {
    CalendarDayLegend, CalendarDayView
  },

  computed: {
    // date() {
    //   return this.$store.state.user.date
    // },
    // reservations() {
    //   return this.$store.getters.reservationsOnWeek
    // },
    // weekDates() {
    //   let startOfWeek = this.date.clone().startOf('isoweek') // HACK: ignore locale, always start on monday
    //   return [
    //     startOfWeek,
    //     startOfWeek.clone().add(1, 'days'),
    //     startOfWeek.clone().add(2, 'days'),
    //     startOfWeek.clone().add(3, 'days'),
    //     startOfWeek.clone().add(4, 'days'),
    //     startOfWeek.clone().add(5, 'days'),
    //     startOfWeek.clone().add(6, 'days')
    //   ]
    // }
  },

  methods: {
    reservationsAt(queryDate) {
      // return this.reservations.filter(r => moment(r.begin).isSame(queryDate, 'day'))
    }
  }
}
</script>

<style scoped>
.rapla-calendar {
  display: flex
}
</style>
