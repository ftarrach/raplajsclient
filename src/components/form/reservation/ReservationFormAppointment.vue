<template lang="pug">
  .columns
    //- Appointments
    .column.is-half
      label.label {{ "reservation.appointments" | gwt-localize }}
      reservation-form-appointment-list(v-model="selectedAppointmentId"
                                        :appointments="appointments")
      .columns.is-size-7
    //- Appointment Edit
    .column.is-half
      label.label &nbsp;
      reservation-form-appointment-detail(v-model="selectedAppointment")
</template>

<script>

import ReservationFormAppointmentList from './ReservationFormAppointmentList'
import ReservationFormAppointmentDetail from './ReservationFormAppointmentDetail'

export default {

  components: {
    ReservationFormAppointmentList,
    ReservationFormAppointmentDetail
  },

  data() {
    return {
      selectedAppointmentId: 0
    }
  },

  props: {
    value: {
      type: Array
    }
  },

  created() {
    this.selectedAppointmentId = this.appointments[0].id
  },

  computed: {
    appointments: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },

    selectedAppointment: {
      get() {
        let selected = this.appointments.filter(a => a.id === this.selectedAppointmentId)[0]
        if (!selected) {
          this.selectedAppointmentId = this.appointments[0].id
          console.log(`nothing selected, selecting ${this.selectedAppointmentId}`)
          return this.appointments[0]
        }
        return selected
      },
      set(newVal) {
        this.selectedAppointmentId = newVal.id
      }
    }
  }

}
</script>
