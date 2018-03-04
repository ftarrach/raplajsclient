<template lang="pug">
  .container
    .card
      header.card-header
        p.card-header-title {{ title }}
        b-button(icon="fa-arrow-left" no-text @click="back" pull-right)
      .card-content(v-if="error")
        p.has-text-danger {{ error }}
      .card-content(v-else)
        .columns.is-multiline.is-centered
          //- Reservation Type
          .column.is-half
            label.label {{ "reservation_type" | gwt-localize }}
            reservation-type-chooser(v-model="type")
          //- step chooser
          .column.is-half
            label.label &nbsp;
            b-steps(medium-dots
                    always-horizontal
                    :items="$options.steps"
                    v-model="step"
                    v-show="typeChosen")
          .column.is-full(v-show="typeChosen")
            keep-alive
              component(:is="stepComponent")
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
// import ReservationFormAppointment from './ReservationFormAppointment'
// import ReservationFormResource from './ReservationFormResource'
// import ReservationFormPermission from './ReservationFormPermission'
// import ReservationFormAttributes from './ReservationFormAttributes'
import ClassificationView from './components/ClassificationView'

export default {

  components: {
    ReservationTypeChooser,
    ClassificationView
    // ReservationFormAppointment,
    // ReservationFormResource,
    // ReservationFormPermission,
    // ReservationFormAttributes
  },

  props: {
    id: {
      type: [Number, String],
      required: false
    },
    modeNew: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  steps: [
    { id: 'attributes', icon: 'fa-align-justify', component: ClassificationView }
    // { id: 'appointment', icon: 'fa-calendar-alt', components: [ReservationFormAppointment, ReservationFormResource] },
    // { id: 'permission', icon: 'fa-lock', components: [ReservationFormPermission] },
    // { id: 'moreAttributes', icon: 'fa-info-circle', components: [] }
  ],

  data() {
    return {
      step: this.$options.steps[0].id,
      error: 'init',
      reservationform: {
        type: {},
        classifications: [],
        allocatables: [],
        appointments: [],
        permissions: []
      }
    }
  },

  computed: {
    // Step Controls
    isFirstStep() { return this.stepNr === 0 },
    isLastStep() { return this.stepNr === this.$options.steps.length - 1 },
    stepComponent() { return this.$options.steps.find(s => s.id === this.step).component },
    stepNr: {
      get() { return this.$options.steps.findIndex(i => i.id === this.step) },
      set(newVal) { this.step = this.$options.steps[newVal].id }
    },

    // Reservation
    type: {
      get() { return this.$store.state.reservationform.type },
      set(newVal) { this.$store.commit('reservationform/setType', newVal) }
    },

    typeChosen() { return Boolean(this.type.id) },

    title() {
      if (this.id) {
        if (this.persistent) {
          this.error = null
          return this.$store.getters['locale/format']('edit_reservation.format', [this.persistent.name])
        } else {
          // invalid id or not loaded yet
          this.error = `No reservation with id ${this.id} found`
          return ''
        }
      } else {
        this.error = null
        return this.$store.getters['locale/localize']('new_reservation')
      }
    },

    persistent() {
      if (this.id) {
        return this.$store.getters['calendar/reservation'](this.id)
      } else {
        return null
      }
    }
  },

  methods: {
    // Step Controls
    back() { this.$router.go(-1) },
    switchStep(newStep) { this.step = newStep },
    nextStep() { this.step = this.$options.steps[this.stepNr].id },
    previousStep() { this.step = this.$options.steps[this.stepNr].id }
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