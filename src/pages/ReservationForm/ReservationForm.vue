<template lang="pug">
  div.pa-2
    v-tabs(value="1")
      v-tab(ripple)
        v-icon info_outline
      v-tab(ripple)
        v-icon mdi-calendar-text
      v-tab(ripple)
        v-icon gavel
      v-tab(ripple)
        v-icon info
      v-tab-item
        classification-edit(
          :classification="classification"
          :type="type"
          @input="classificationUpdate"
        )
      v-tab-item
        appointment-edit(
          :appointments="appointments"
          :selected-appointment-id="selectedAppointmentId"
          @select="selectAppointment"
          @input="appointmentUpdate"
        )
      v-tab-item
        v-layout
          v-flex(xs-12)
            permission-edit
      v-tab-item
        v-layout
          v-flex(xs-12)
            additional-classification-edit(
              :classification="classification"
              :type="type"
              @input="classificationUpdate"
            )
</template>

<script>
import ClassificationEdit from '@/components/ClassificationEdit/ClassificationEdit'
import AdditionalClassificationEdit from '@/components/ClassificationEdit/AdditionalClassificationEdit'
import AppointmentEdit from '@/components/AppointmentEdit/AppointmentEdit'
import PermissionEdit from '@/components/PermissionEdit/PermissionEdit'
import Reservation from '@/types/Reservation'

export default {
  name: 'ReservationForm',

  components: {
    ClassificationEdit,
    AppointmentEdit,
    AdditionalClassificationEdit,
    PermissionEdit
  },

  props: {
    reservation: {
      type: [Object, Reservation]
    },
    gwtWindow: {
      type: Object
    }
  },

  data() {
    return {
      type: {
        attributes: []
      },
      classification: {},
      allocatables: [],
      appointments: [],
      permissions: [],
      gwt: {},
      selectedAppointmentId: ''
    }
  },

  computed: {
    gwtAppointments() {
      if (this.gwt) return this.gwt.getAppointments()
      else return []
    },

    selectedAppointment() {
      return this.appointments.find(a => a.id === this.selectedAppointmentId)
    },

    selectedGwtAppointment() {
      return this.selectedAppointment.GWT
    }
  },

  created() {
    this.gwt = this.reservation.GWT
    this.type = this.reservation.type
    this.classification = this.reservation.classification
    this.appointments = this.reservation.appointments
    if (this.appointments.length > 0) {
      this.selectedAppointmentId = this.appointments[0].id
    }
  },

  methods: {
    classificationUpdate(e) {
      this.classification.data[e.name] = e.newVal
      if (window.api && e.newVal) {
        const classification = this.gwt.getClassification()
        if (e.type === 'DATE') {
          classification.setValue(e.name, e.newVal.gwtDate())
        } else if (e.type === 'ALLOCATABLE') {
          classification.setValues(
            e.name,
            e.newVal.map(id => window.api.findAllocatableById(id))
          )
        } else if (e.type === 'CATEGORY') {
          classification.setValues(
            e.name,
            e.newVal.map(id => window.api.findCategoryById(id))
          )
        } else {
          classification.setValue(e.name, e.newVal)
        }
      }
    },

    selectAppointment(appointmentId) {
      // TODO: notify gwt
    },

    appointmentUpdate({ name, value }) {
      switch (name) {
        case 'repeating-interval':
          this.selectedAppointment.repeating.interval = value
          if (this.selectedGwtAppointment) {
            this.selectedGwtAppointment.getRepeating().setInterval(value)
          }
          break
        case 'repeating-weekdays':
          this.selectedAppointment.repeating.weekdays = value
          if (this.selectedGwtAppointment) {
            this.selectedGwtAppointment
              .getRepeating()
              .setWeekdays(window.api.asSet(value))
          }
          break
        case 'starttime':
          this.selectedAppointment.start.time = value
          if (this.selectedGwtAppointment) {
            // TODO: set gwt date
          }
          break
        case 'endtime':
          this.selectedAppointment.start.time = value
          if (this.selectedGwtAppointment) {
            // TODO: set gwt date
          }
          break
      }
    }
  }
}
</script>
