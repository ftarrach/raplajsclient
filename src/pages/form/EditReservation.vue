<template lang="pug">
  div
    p.has-text-danger(v-show="ready && error") {{ error }}
    reservation-form(:id="id" v-show="ready && !error")

</template>

<script>

import ReservationForm from '@/components/form/reservation/ReservationForm'

export default {
  components: {
    ReservationForm
  },

  data() {
    return {
      ready: false,
      error: false
    }
  },

  computed: {
    id() {
      return this.$route.params.id
    }
  },

  methods: {
    prepareStore() {
      if (this.$store.state.calendar.reservations.length === 0) {
        // NOTE: If the user navigates to this page directly, the store hasn't been
        // initialized yet. This method loads the calendar by the default calendar model.
        // this may cause errors if the reservation isn't available in the current time interval
        this.$store.dispatch('calendar/loadReservations')
          .then(this.loadReservation)
      } else {
        this.loadReservation()
      }
    },

    loadReservation() {
      console.log('EditReservation: load')
      let persistent = this.$store.getters['calendar/reservation'](this.id)
      if (persistent) {
        this.$store.dispatch('reservationform/editReservation', persistent)
      } else {
        this.error = `No reservation with id ${this.id} found`
      }
      this.ready = true
    }
  },

  created() {
    this.prepareStore()
  }
}
</script>
