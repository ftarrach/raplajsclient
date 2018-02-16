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
          | In Einzeltermine umwandeln
      .column
        button.button.is-size-7.is-fullwidth.is-danger(@click="exceptionClick")
          | Ausnahmen (0)
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

  data() {
    return {
      repeatOptions: [
        {value: 'single', label: 'Einzeltermin'},
        {value: 'weekly', label: 'Wöchentlich'},
        {value: 'daily', label: 'Täglich'},
        {value: 'monthly', label: 'Monatlich'},
        {value: 'yearly', label: 'Jährlich'}
      ]
    }
  },

  computed: {
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
