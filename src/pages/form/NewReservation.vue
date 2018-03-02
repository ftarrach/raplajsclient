<template lang="pug">
  reservation-form
</template>

<script>

import ReservationForm from '@/components/form/reservation/ReservationForm'

export default {
  components: {
    ReservationForm
  },

  created() {
    // TODO: don't pass firstreservation, use reservationcontroller.newReservation
    this.$store.dispatch('reservationform/newReservation', this.$store.getters['facade/firstReservationType'])
  }
}
</script>
