<template lang="pug">
  .columns
    //- Appointments
    .column.is-half
      label.label {{ "reservation.appointments" | gwt-localize }}
      appointment-list(v-model="selectedAppointmentId")
      .columns.is-size-7
    //- Appointment Edit
    .column.is-half
      label.label &nbsp;
      appointment-detail(:id="selectedAppointmentId")
</template>

<script>

import AppointmentList from '../components/AppointmentList'
import AppointmentDetail from '../components/AppointmentDetail'

export default {

  components: {
    AppointmentList,
    AppointmentDetail
  },

  data() {
    return {
      selectedAppointmentId: false
    }
  }

}
</script>
