<template lang="pug">
  option(:value="appointment.id")
    p(v-for="line in label")
      | {{ line }}
</template>

<script>
import Appointment from '@/types/Appointment'

export default {

  props: {
    appointment: {
      type: Appointment,
      required: true
    }
  },

  computed: {

    // THINK: split up?
    label() {
      let timespan = this.timespan

      if (this.appointment.repeating === null) {
        return this.labelForSingleAppointment
      }
      let weekdays = this.appointment.repeating.weekdays.map(w => this.$store.getters['locale/formatWeekday'](parseInt(w.toString()), 'short')).join(', ')
      let repeat = ''
      let localize = this.$store.getters['locale/localize']
      if (this.appointment.repeating.interval === 1) {
        repeat = localize(this.appointment.repeating.type)
      } else {
        let typeStr = localize(this.appointment.repeating.type)
        if (this.appointment.repeating.type === 'weekly') {
          typeStr = localize('weeks')
        } else if (this.appointment.repeating.type === 'daily') {
          typeStr = localize('days')
        }
        repeat = this.$store.getters['locale/format']('interval.format', [this.appointment.repeating.interval, typeStr])
      }
      let until = this.labelFromUntil
      return [
        `${weekdays} ${timespan} ${repeat}`,
        until
      ]
    },

    labelForSingleAppointment() {
      let weekday = this.$store.getters['locale/getWeekday'](this.appointment.start)
      let date = this.$store.getters['locale/formatDate'](this.appointment.start)
      let time = this.timespan
      return [
        `${weekday} ${date} ${time}`
      ]
    },

    labelFromUntil(appointment) {
      let format = this.$store.getters['locale/format']
      let formatDate = this.$store.getters['locale/formatDate']
      let until = [format('format.repeat_from', [ formatDate(this.appointment.start) ])]
      if (this.appointment.repeating.end) {
        until.push(format('format.repeat_until', [ formatDate(this.appointment.repeating.end) ]))
      }
      if (this.appointment.repeating.number !== -1) {
        until.push(format('format.repeat_n_times', this.appointment.repeating.number))
      }
      if (until.length === 1) {
        until.push('Kein Ende')
      }
      return until.join(' ')
    },

    timespan(appointment) {
      let formatTime = this.$store.getters['locale/formatTime']
      return this.appointment.isWholeDay ? '' : `${formatTime(this.appointment.start)}-${formatTime(this.appointment.end)}`
    }
  }

}
</script>
