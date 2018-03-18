<template lang="pug">
  div
    .columns.is-multiline
      .column.is-2
        p {{ "start_date" | gwt-localize }}
      .column.is-10
        b-date-timepicker(v-model="start")
      .column.is-2
        p {{ "end_date" | gwt-localize }}
      .column.is-10
        b-date-timepicker(v-model="end")
      .column.is-2
      .column.is-10
        .b-checkbox.is-primary
          | #[input#whole-day(type="checkbox" v-model="wholeDay").styled] #[label(for="whole-day") {{ "all-day" | gwt-localize }}]
</template>

<script>

// TODO: real values
export default {

  props: {
    id: {
      type: [String, Boolean],
      required: true
    }
  },

  computed: {
    appointment() {
      return this.$store.getters['reservationform/appointment'](this.id)
    },

    start: {
      get() { return this.appointment.start },
      set(newVal) {
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'start',
          value: newVal
        })
      }
    },

    end: {
      get() { return this.appointment.end },
      set(newVal) {
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'end',
          value: newVal
        })
      }
    },

    wholeDay: {
      get() { return this.appointment.isWholeDay },
      set(newVal) {
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'isWholeDay',
          value: newVal
        })
      }
    }

  }
}
</script>
