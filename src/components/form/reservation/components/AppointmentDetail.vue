<template lang="pug">
  .reservation-form-appointment-detail(v-if="appointment")
    .repeat.columns.is-multiline.is-gapless.is-marginless
      .column.is-one-fifth-desktop.is-half-tablet(v-for="option in repeatOptions")
        b-toggle-button(fullwidth
                        :label="option.label"
                        :value="option.value"
                        :selected="option.value === appointment.repeating.type"
                        @click="setRepeat")
    .columns.is-gapless
      .column
        button.button.is-size-7.is-fullwidth.is-outlined(:disabled="appointment.enddatetype === 'infinity'")
          | {{ "appointment.convert" | gwt-localize }}
      .column
        button.button.is-size-7.is-fullwidth.is-danger(@click="exceptionClick")
          | {{ "appointment.exceptions" | gwt-localize }} (0)
    component(:is="repeatType" :id="id")
</template>

<script>

import ReservationFormAppointmentDetailWeek from './ReservationFormAppointmentDetailWeek'

export default {

  components: {
    ReservationFormAppointmentDetailWeek
  },

  props: {
    id: {
      type: [String, Boolean], // appointment object
      required: true
    }
  },

  computed: {
    appointment() {
      if (!this.id) {
        return false
      }
      return this.$store.state.reservationform.appointments.find(a => a.id === this.id)
    },

    repeatOptions() {
      return [
        { value: null, label: this.$store.getters['locale/localize']('no_repeating') },
        { value: 'weekly', label: this.$store.getters['locale/localize']('weekly') },
        { value: 'daily', label: this.$store.getters['locale/localize']('daily') },
        { value: 'monthly', label: this.$store.getters['locale/localize']('monthly') },
        { value: 'yearly', label: this.$store.getters['locale/localize']('yearly') }
      ]
    },

    repeatType() {
      if (this.appointment && this.appointment.repeating.type === 'weekly') {
        return ReservationFormAppointmentDetailWeek
      }
      return null
    }
  },

  methods: {
    setRepeat(newVal) {

    },
    exceptionClick() {
      alert('exceptionClick()')
    }
  }
}
</script>
