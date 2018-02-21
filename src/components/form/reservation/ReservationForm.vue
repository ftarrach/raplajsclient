<template lang="pug">
  .container
    .card
      header.card-header
        p.card-header-title {{ title }}
        b-button(icon="fa-arrow-left" no-text @click="back" pull-right)
      .card-content
        .columns.is-multiline.is-centered
          //- Name
          .column.is-half
            label.label {{ "name" | gwt-localize }}
            input.input(v-model="name")
          //- Reservation Type
          .column.is-half
            label.label {{ "reservation_type" | gwt-localize }}
            reservation-type-chooser(v-model="type")
          //- step chooser
          .column.is-full
            hr.line
          .column.is-three-quarters
            b-steps(medium-dots
                    always-horizontal
                    :items="$options.steps"
                    v-model="step")
          //- step components
          .column.is-full(v-show="step === 'appointment'")
            reservation-form-appointment(v-model="appointments")
          .column.is-full(v-show="step === 'resource'")
            reservation-form-resource(v-model="resources")
          .column.is-full(v-show="step === 'permission'")
            reservation-form-permission(v-model="permissions")
      footer
        .card-footer
          a.card-footer-item(href="#") {{ "delete" | gwt-localize }}
          a.card-footer-item(@click.stop.prevent="previousStep", :class="{'disabled': isFirstStep}")
            i.fas.fa-arrow-left
          a.card-footer-item(@click.stop.prevent="nextStep" :class="{'disabled': isLastStep}")
            i.fas.fa-arrow-right
          a.card-footer-item(href="#") {{ "save" | gwt-localize }}
</template>

<script>

import ReservationTypeChooser from '@/components/widgets/ReservationTypeChooser'
import ReservationFormAppointment from './ReservationFormAppointment'
import ReservationFormResource from './ReservationFormResource'
import ReservationFormPermission from './ReservationFormPermission'

export default {

  components: {
    ReservationTypeChooser,
    ReservationFormAppointment,
    ReservationFormResource,
    ReservationFormPermission
  },

  props: {
    title: {
      type: String,
      required: true
    }
  },

  steps: [
    { id: 'appointment', icon: 'fa-calendar-alt' },
    { id: 'resource', icon: 'fa-archive' },
    { id: 'permission', icon: 'fa-lock' }
  ],

  data() {
    return {
      id: null,
      type: {},
      name: '',
      appointments: [],
      resources: [],
      permissions: [],
      step: 'appointment'
    }
  },

  computed: {
    isFirstStep() {
      return this.stepNr === 0
    },
    isLastStep() {
      return this.stepNr === this.$options.steps.length - 1
    },
    stepNr() {
      return this.$options.steps.findIndex(i => i.id === this.steps)
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },
    switchStep(newStep) {
      this.step = newStep
      this.stepNr = this.$options.steps.indexOf(newStep)
    },
    nextStep() {
      if (this.stepNr < this.$options.steps.length - 1) {
        this.stepNr = this.stepNr + 1
        this.step = this.$options.steps[this.stepNr]
      }
    },
    previousStep() {
      if (this.stepNr > 0) {
        this.stepNr = this.stepNr - 1
        this.step = this.$options.steps[this.stepNr]
      }
    }
  },

  created() {
    let id = this.$route.params.id
    let found = this.$store.getters.reservationById(id)
    if (found.length > 0) {
      let reservation = found[0]
      this.id = id
      this.appointments = reservation.appointments
      this.resources = reservation.resources
      this.permissions = reservation.permissions
      this.type = reservation.type
      this.name = reservation.name
      this.stepComponent = ReservationFormAppointment
    } else {
      // TODO: if id is set, but not found in store, show an error to the user
      alert(`no reservation with id ${id} found`)
    }
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 1em;
  }

  .card {
    margin: 2em;
  }

  hr.line {
    margin: 0.2em
  }

  header.card-header {
    padding-right: 8px;
    align-items: center;
  }

  .disabled {
    pointer-events: none;
    color: #000;
  }

  .card-content {
    min-height: 43em;
  }
</style>