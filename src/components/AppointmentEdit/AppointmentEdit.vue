<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 md4)
      appointment-list.ma-1(
        :appointments="appointments"
        :selected-id="selectedAppointmentId"
        @select="selectedAppointmentChanged"
      )
    v-flex(xs12 md8)
      appointment-detail.ma-1(
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
