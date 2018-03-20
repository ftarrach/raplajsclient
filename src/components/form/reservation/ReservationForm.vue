<template lang="pug">
  .container
    .card
      header.card-header
        p.card-header-title {{ title }}
        b-button(icon="arrow-left" no-text @click="back" pull-right)
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
          a.card-footer-item(@click.prevent="remove") {{ "delete" | gwt-localize }}
          a.card-footer-item(@click.prevent="previousStep", :class="{'disabled': isFirstStep}")
            fa-icon(icon="arrow-left")
          a.card-footer-item(@click.prevent="nextStep" :class="{'disabled': isLastStep}")
            fa-icon(icon="arrow-right")
          a.card-footer-item(@click.prevent="save") {{ "save" | gwt-localize }}
</template>

<script>

import ReservationTypeChooser from '@/components/widgets/ReservationTypeChooser'
import AppointmentView from './pages/AppointmentView'
// import ReservationFormResource from './ReservationFormResource'
// import ReservationFormPermission from './ReservationFormPermission'
// import ReservationFormAttributes from './ReservationFormAttributes'
import ClassificationView from './pages/ClassificationView'
import AdditionalClassificationView from './pages/AdditionalClassificationView'

export default {

  components: {
    ReservationTypeChooser,
    ClassificationView,
    AdditionalClassificationView,
    AppointmentView
    // ReservationFormResource,
    // ReservationFormPermission,
    // ReservationFormAttributes
  },

  props: {
    id: {
      type: [Number, String],
      required: false
    }
  },

  steps: [
    // { id: 'attributes', icon: 'align-justify', component: ClassificationView },
    { id: 'appointment', icon: 'calendar-alt', component: AppointmentView },
    // { id: 'permission', icon: 'lock', component: [ReservationFormPermission] },
    { id: 'moreAttributes', icon: 'info-circle', component: AdditionalClassificationView }
  ],

  data() {
    return {
      step: this.$options.steps[0].id,
      error: 'init'
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
      set(newVal) {
        if (this.$store.getters['reservationform/isNew']) {
          this.$store.dispatch('reservationform/create', newVal.id)
        } else {
          this.$store.commit('setType', newVal)
        }
      }
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
    nextStep() { this.step = this.$options.steps[this.stepNr + 1].id },
    previousStep() { this.step = this.$options.steps[this.stepNr - 1].id },

    save() {
      this.$store.dispatch('reservationform/save')
    },

    remove() {
      // TODO: disable delete button if reservation is new
      this.$store.dispatch('reservationform/delete')
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