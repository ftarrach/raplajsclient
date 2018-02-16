<template lang="pug">
  .reservation-form-appointment-detail
    .repeat.columns.is-multiline.is-gapless.is-marginless
      .column.is-one-fifth-desktop.is-half-tablet(v-for="option in repeatOptions")
        b-toggle-button(fullwidth
                        :label="option.label"
                        :value="option.value"
                        :selected="option.value === value.repeat.type"
                        @click="setRepeat")
    .columns.is-gapless
      .column
        button.button.is-size-7.is-fullwidth.is-outlined(:disabled="value.enddatetype === 'infinity'")
          | {{ "appointment.convert" | r-localize }} 
      .column
        button.button.is-size-7.is-fullwidth.is-danger(@click="exceptionClick")
          | {{ "appointment.exceptions" | r-localize }} (0)
    component(:is="repeatType" v-model="value")
</template>

<script>

import ReservationFormAppointmentDetailWeek from './ReservationFormAppointmentDetailWeek'

export default {

  components: {
    ReservationFormAppointmentDetailWeek
  },

  props: {
    value: {
      type: Object, // appointment object
      required: true
    }
  },

  computed: {
    repeatOptions() {
      return [
        { value: 'single', label: this.$rapla.localize('no_repeating') },
        { value: 'weekly', label: this.$rapla.localize('weekly') },
        { value: 'daily', label: this.$rapla.localize('daily') },
        { value: 'monthly', label: this.$rapla.localize('monthly') },
        { value: 'yearly', label: this.$rapla.localize('yearly') }
      ]
    },
    repeatType() {
      if (this.value.repeat.type === 'weekly') {
        return ReservationFormAppointmentDetailWeek
      }
    }
  },

  methods: {
    setRepeat(newVal) {
      this.$emit('input', Object.assign(this.value, {repeat: Object.assign(this.value.repeat, {type: newVal.value})}))
    },
    exceptionClick() {
      alert('exceptionClick()')
    }
  }
}
</script>
