<template lang="pug">
  .container
    .card
      header.card-header
        p.card-header-title {{ title }}
        b-button(icon="fa-arrow-left" no-text @click="back" pull-right)
      .card-content
        .columns.is-multiline.is-centered
          //- Reservation Type
          .column.is-half
            label.label {{ "reservation_type" | gwt-localize }}
            reservation-type-chooser(v-model="type")
          //- Name
          //-.column.is-half
            label.label {{ "name" | gwt-localize }}
            input.input(v-model="name")
          //- horizontal line
          .column.is-full
            hr.line
          //- step chooser
          .column.is-three-quarters
            b-steps(medium-dots
                    always-horizontal
                    :items="$options.steps"
                    v-model="step")
          //- step components
          .column.is-full(v-show="step === 'attributes'")
            reservation-form-attributes(v-model="attributes")
          .column.is-full(v-show="step === 'appointment'")
            reservation-form-appointment(v-model="appointments")
            reservation-form-resource(v-model="resources")
          .column.is-full(v-show="step === 'permission'")
            reservation-form-permission(v-model="permissions")
          .column.is-full(v-show="step === 'moreAttributes'")
            p TODO: More Attributes
      footer
        .card-footer
          a.card-footer-item(href="#") {{ "delete" | gwt-localize }}
          a.card-footer-item(@click.stop.prevent="previousStep", :class="{'disabled': isFirstStep}")
            fa-icon(icon="fa-arrow-left")
          a.card-footer-item(@click.stop.prevent="nextStep" :class="{'disabled': isLastStep}")
            fa-icon(icon="fa-arrow-right")
          a.card-footer-item(href="#") {{ "save" | gwt-localize }}
</template>

<script>

import ReservationTypeChooser from '@/components/widgets/ReservationTypeChooser'
import ReservationFormAppointment from './ReservationFormAppointment'
import ReservationFormResource from './ReservationFormResource'
import ReservationFormPermission from './ReservationFormPermission'
import ReservationFormAttributes from './ReservationFormAttributes'
import Attribute from '@/types/Attribute'

export default {

  components: {
    ReservationTypeChooser,
    ReservationFormAppointment,
    ReservationFormResource,
    ReservationFormPermission,
    ReservationFormAttributes
  },

  props: {
    title: {
      type: String,
      required: true
    }
  },

  steps: [
    { id: 'attributes', icon: 'fa-align-justify', components: [] },
    { id: 'appointment', icon: 'fa-calendar-alt', components: [ReservationFormAppointment, ReservationFormResource] },
    { id: 'permission', icon: 'fa-lock', components: [ReservationFormPermission] },
    { id: 'moreAttributes', icon: 'fa-info-circle', components: [] }
  ],

  data() {
    return {
      id: null,
      type: {},
      attributes: [],
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
    stepNr: {
      get() {
        return this.$options.steps.findIndex(i => i.id === this.step)
      },
      set(newVal) {
        this.step = this.$options.steps[newVal].id
      }
    },
    stepComponents() {
      console.log(this.$options.steps)
      return this.$options.steps.find(s => s.id === this.step).components
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
        this.step = this.$options.steps[this.stepNr].id
      }
    },
    previousStep() {
      if (this.stepNr > 0) {
        this.stepNr = this.stepNr - 1
        this.step = this.$options.steps[this.stepNr].id
      }
    }
  },

  created() {
    let id = this.$route.params.id
    let found = this.$store.getters.reservationById(id)
    if (found.length > 0) {
      let reservation = found[0]
      this.id = id
      // DEBUG: start
      let a = new Attribute('name', 'eventname', 'STRING')
      a.value = found.name
      this.attributes = [a]
      // DEBUG: end
      this.appointments = reservation.appointments
      this.resources = reservation.resources
      this.permissions = reservation.permissions
      this.type = reservation.type
      // this.name = reservation.name
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
    color: #aaa;
  }

  .card-content {
    min-height: 43em;
  }
</style>