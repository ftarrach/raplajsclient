<template lang="pug">
  .day-column(:style="{flexGrow: width}")
    .hours
      .day-column-hour(v-for="i in 23" :key="i")
    .calendar-appointments
      .day-subcolumn(v-for="i in range(width)")
        appointment-block(
          v-for="appointment in appointments.filter(a => a.column === i)"
          :key="appointment.id"
          :identifier="appointment.id"
          :text="appointment.lines"
          :start="appointment.start"
          :end="appointment.end"
          @click="onAppointmentBlockClick"
        )
</template>

<script>
import AppointmentBlock from './AppointmentBlock'

export default {
  components: {
    AppointmentBlock
  },

  props: {
    appointments: {
      type: Array,
      required: false,
      default: () => []
    },

    width: {
      type: Number,
      required: false,
      default: () => 1
    }
  },

  methods: {
    range(to) {
      return [...Array(to).keys()]
    },

    onAppointmentBlockClick(id) {
      return this.$emit('block-click', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './variables'

.day-column
  display flex
  flex 1 1 0%
  flex-direction column
  border-right $border

  .day-column-hour
    line-height $hour-height
    height $hour-height
    border-bottom $border

  .hours
    position relative
    height 24em * $hour-height

  .calendar-appointments
    position relative
    height 24em * $hour-height
    top -24em * $hour-height
    display flex
    flex-direction row

    .day-subcolumn
      flex-grow 1
      height 100%
      position relative
      margin 0 .25em

      &:first-child
        margin-left .5em

      &:last-child
        margin-right .5em
</style>
