<template lang="pug">
  v-layout
    v-flex(xs12 md4)
      appointment-list.ma-2(
        :appointments="appointments"
        :gwt-appointments="gwtAppointments"
        :selected-id="selectedAppointmentId"
        @select="selectedAppointmentChanged"
      )
    v-flex(xs12 md8)
      appointment-detail.ma-2(
        v-if="selectedAppointment"
        :appointment="selectedAppointment"
      )
</template>

<script>
import AppointmentList from './AppointmentList'
import AppointmentDetail from './AppointmentDetail'

export default {
  components: {
    AppointmentList,
    AppointmentDetail
  },

  props: {
    appointments: {
      type: Array,
      required: true
    },

    gwtAppointments: {
      type: Array
    },

    selectedAppointmentId: {
      type: String
    }
  },

  computed: {
    selectedAppointment() {
      if (this.selectedAppointmentId) return this.appointments.find(a => a.id === this.selectedAppointmentId)
    }
  },

  methods: {
    selectedAppointmentChanged(newVal) {
      this.$emit('select', newVal)
    }
  }
}
</script>
