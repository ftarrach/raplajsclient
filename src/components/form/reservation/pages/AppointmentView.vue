<template lang="pug">
  .columns.is-multiline
    //- Appointments
    .column.is-half
      label.label {{ "reservation.appointments" | gwt-localize }}
      appointment-list(v-model="selectedAppointmentId")
    //- Appointment Edit
    .column.is-half
      label.label &nbsp;
      appointment-detail(:id="selectedAppointmentId")
    //- allocatables
    .column.is-half
      label.label {{ "reservation.allocations" | gwt-localize }}
      resource-list(:appointment-id="selectedAppointmentId")
</template>

<script>

import AppointmentList from '../components/AppointmentList'
import AppointmentDetail from '../components/AppointmentDetail'
import ResourceList from '../components/ResourceList'

export default {

  components: {
    AppointmentList,
    AppointmentDetail,
    ResourceList
  },

  data() {
    return {
      selectedAppointmentId: false
    }
  }

}
</script>
