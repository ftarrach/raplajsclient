<template lang="pug">
  .calendar-wrap
    .calendar
      .calendar-head(:style="headClass")
        .legend
          span.legendlabel {{ legendlabel }}
        .headers
          day-header(
            v-for="day in days"
            :day="day"
            :key="day.date"
            :width="{appointments, day} | appointmentsOnDay | columnWidth"
          )
      .calendar-body
        .legend
          .clock(v-for="i in 23")
            span {{ i | leadingzero }}
        day-column(
          v-for="day in days"
          :key="day.date"
          :appointments="{appointments, day} | appointmentsOnDay"
          :width="{appointments, day} | appointmentsOnDay | columnWidth"
          @block-click="appointmentBlockClick"
        )
</template>

<script>
import DayColumn from './DayColumn'
import DayHeader from './DayHeader'

export default {
  components: {
    DayColumn,
    DayHeader
  },

  props: {
    days: {
      type: Array,
      required: false,
      default: () => []
    },

    appointments: {
      type: Array,
      required: false,
      default: () => []
    },

    legendlabel: {
      type: String,
      required: false,
      default: () => ''
    }
  },

  computed: {
    headClass() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        return {
          left: '300px'
        }
      }
    }
  },

  methods: {
    appointmentBlockClick(id) {
      this.$emit('block-click', id)
    }
  },

  filters: {
    leadingzero(value) {
      return (value < 10 ? `0${value}` : value) + ':00'
    },

    appointmentsOnDay({ appointments, day }) {
      return appointments.filter(
        a => a.start.sameDay(day) || a.end.sameDay(day)
      )
    },

    columnWidth(appointments) {
      if (appointments.length > 0) {
        return Math.max(...appointments.map(a => a.column)) + 1
      }
      return 1
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './variables'

.headers
  display flex
  flex-grow 1

.calendar
  display flex
  flex-direction column
  background white

  .legend
    width $legend-width
    border-bottom $border
    padding-top ($hour-height / 2)
    border-right $border

  .calendar-head
    background white
    display flex
    height $header-height
    z-index 2
    transition left 0.1s
    position fixed
    width 100%

    @media (min-width: 600px)
      width calc(100% - 300px)

  .calendar-body
    display flex
    padding-bottom 0.2em

    .legend
      width $legend-width

.calendar-wrap
  height 25.25em * $hour-height
  overflow hidden

.clock
  height $hour-height
  line-height $hour-height
  color $legend-color
  text-align center

.legendlabel
  font-size 0.75em
  color $legend-color
</style>
