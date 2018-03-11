<template lang="pug">
  div
    .columns.is-gapless.is-mobile
      .column.is-2-mobile.is-2-tablet
        a.button.is-fullwidth.is-success(@click="add")
          fa-icon(icon="plus")
      .column.is-2-mobile.is-2-tablet
        a.button.is-fullwidth.is-danger(@click="remove")
          fa-icon(icon="trash-alt")
      .column.is-8
        a.button.is-fullwidth {{ "appointment.search_free" | gwt-localize }}
    .columns
      .column.is-fullwidth
        .select.is-multiple.is-flex.is-size-7-mobile
          include ../../../widgets/SingleMultiSelect.pug
            block option
              option(:value="appointment.id"
                     v-for="appointment in appointments"
                     :key="appointment.id")
                p(v-for="line in label(appointment)")
                  | {{ line }}
</template>

<script>
// THINK: externalize ReservationFormAppointmentlistItem
import SingleMultiSelect from '@/components/widgets/SingleMultiSelect'

export default {

  extends: SingleMultiSelect,

  props: {
    value: {
      type: [String, Boolean], // id of selected appointment
      required: true
    }
  },

  computed: {
    appointments() {
      let appointments = this.$store.state.reservationform.appointments
      if (!this.value && appointments.length > 0) {
        this.$emit('input', appointments[0].id)
      }
      return appointments
    }
  },

  methods: {

    add() {
      alert('AppointmentList.add')
    },

    remove() {
      alert('AppointmentList.remove')
    },

    // THINK: split up?
    label(appointment) {
      let formatTime = this.$store.getters['locale/formatTime']
      let formatDate = this.$store.getters['locale/formatDate']
      let format = this.$store.getters['locale/format']

      let weekdays = appointment.repeating.weekdays.map(w => this.$store.getters['locale/formatWeekday'](parseInt(w.toString()), 'short')).join(', ')
      let timespan = appointment.isWholeDay ? '' : `${formatTime(appointment.start)}-${formatTime(appointment.end)}`

      if (appointment.repeating.type === null) {
        // single appointment
        return [
          `${weekdays} ${formatDate(appointment.start)} ${timespan}`
        ]
      }
      if (appointment.repeating.type) {
        let repeat = ''
        let localize = this.$store.getters['locale/localize']
        if (appointment.repeating.interval === 1) {
          repeat = localize(appointment.repeating.type)
        } else {
          let typeStr = localize(appointment.repeating.type)
          if (appointment.repeating.type === 'weekly') {
            typeStr = localize('weeks')
          } else if (appointment.repeating.type === 'daily') {
            typeStr = localize('days')
          }
          repeat = this.$store.getters['locale/format']('interval.format', [appointment.repeating.interval, typeStr])
        }
        let until = [format('format.repeat_from', [ formatDate(appointment.start) ])]
        if (appointment.repeating.end) {
          until.push(format('format.repeat_until', [ formatDate(appointment.repeating.end) ]))
        }
        if (appointment.repeating.number !== -1) {
          until.push(format('format.repeat_n_times', appointment.repeating.number))
        }
        if (until.length === 1) {
          until.push('Kein Ende')
        }
        return [
          `${weekdays} ${timespan} ${repeat}`,
          until.join(' ')
        ]
      }
    }
  }
}
</script>

<style scoped>
  .columns.is-gapless {
    margin-bottom: 0
  }
</style>
