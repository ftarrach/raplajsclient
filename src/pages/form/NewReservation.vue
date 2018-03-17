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
    this.$store.dispatch('reservationform/newReservation')
  }
}
</script>
