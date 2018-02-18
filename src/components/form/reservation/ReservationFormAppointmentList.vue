<template lang="pug">
  div
    .columns.is-gapless.is-mobile
      .column.is-2-mobile.is-2-tablet
        a.button.is-fullwidth.is-success
          span.icon
            i.fas.fa-plus
      .column.is-2-mobile.is-2-tablet
        a.button.is-fullwidth.is-warning
          span.icon
            i.fas.fa-copy
      .column.is-2-mobile.is-2-tablet
        a.button.is-fullwidth.is-danger
          span.icon
            i.fas.fa-trash-alt
      .column.is-6
        a.button.is-fullwidth {{ "appointment.search_free" | gwt-localize }}
    .columns
      .column.is-fullwidth
        .select.is-multiple.is-flex.is-size-7-mobile
          include ../../widgets/SingleMultiSelect.pug
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
import moment from 'moment'

export default {

  extends: SingleMultiSelect,

  props: {
    appointments: {
      type: Array, // array of appointments
      required: true
    },
    value: {
      type: [String, Number], // id of selected appointment
      required: true
    }
  },

  created() {
    this.selectedItems = this.appointments.filter(a => a.id === this.value)
  },

  methods: {
    // TODO: use gwt localization
    label(appointment) {
      let weekdays = appointment.days.map(m => moment(m).weekday(m).format('dd')).join(', ')
      let timespan = ''
      if (appointment.time) {
        timespan = `${appointment.time.from}-${appointment.time.to}`
      }
      let repeat = this.localize(appointment.repeat)
      let until = 'Kein Ende'
      if (appointment.enddatetype === 'until') {
        until = `bis zum ${moment(appointment.end).format('L')}`
      } else if (appointment.enddatetype === 'x-times') {
        let enddate = moment(appointment.end).add(appointment.repeat.times - 1, 'weeks').format('L')
        until = `bis zum ${enddate} wiederhole ${appointment.repeat.times} Mal`
      }
      return [
        `${weekdays} ${timespan} ${repeat}`,
        `ab dem ${moment(appointment.begin).format('L')} ${until}`
      ]
    },

    localize(repeat) {
      if (repeat.interval === 1) {
        if (repeat.type === 'daily') {
          return 'täglich'
        } else if (repeat.type === 'weekly') {
          return 'wöchentlich'
        } else if (repeat.type === 'monthly') {
          return 'monatlich'
        } else if (repeat.type === 'yearly') {
          return 'jährlich'
        }
      } else {
        if (repeat.type === 'daily') {
          return `Alle ${repeat.interval} Tage`
        } else if (repeat.type === 'weekly') {
          return `Alle ${repeat.interval} Wochen`
        } else if (repeat.type === 'monthly') {
          return `Alle ${repeat.interval} Monate`
        } else if (repeat.type === 'yearly') {
          return `Alle ${repeat.interval} Jahre`
        }
      }
      return 'unbekannt'
    }
  }

}
</script>

<style scoped>
  .columns.is-gapless {
    margin-bottom: 0
  }
</style>
