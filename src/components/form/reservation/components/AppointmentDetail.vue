<template lang="pug">
  .appointment-detail(v-if="appointment")
    .repeat.columns.is-multiline.is-gapless.is-marginless
      .column.is-one-fifth-desktop.is-half-tablet(v-for="option in repeatOptions")
        b-toggle-button(fullwidth
                        :label="option.label"
                        :value="option.value"
                        :selected="option.value === (appointment.repeating ? appointment.repeating.type : null)"
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

import AppointmentDetailSingle from './AppointmentDetailSingle'
import AppointmentDetailWeek from './AppointmentDetailWeek'

export default {

  components: {
    AppointmentDetailSingle,
    AppointmentDetailWeek
  },

  props: {
    id: {
      type: [String, Boolean], // appointment object
      required: true
    }
  },

  computed: {
    appointment() {
      return this.id
        ? this.$store.state.reservationform.appointments.find(a => a.id === this.id)
        : false
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
      if (!this.appointment) {
        return null
      }
      if (!this.appointment.repeating) {
        return AppointmentDetailSingle
      }
      switch (this.appointment.repeating.type) {
        case 'weekly':
          return AppointmentDetailWeek
        case 'daily':
        case 'monthly':
        case 'yearly':
          return null
      }
    }
  },

  methods: {
    setRepeat(newVal) {
      this.$store.commit('reservationform/setRepeatType', {
        id: this.appointment.id,
        value: newVal.value
      })
    },
    exceptionClick() {
      alert('exceptionClick()')
    }
  }
}
</script>
