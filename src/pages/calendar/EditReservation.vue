<template lang="pug">
  reservation-form(:title="title")
</template>

<script>

import ReservationForm from '@/components/form/reservation/ReservationForm'

export default {
  components: {
    ReservationForm
  },

  computed: {
    title() {
      let found = this.$store.getters.reservationById(this.$route.params.id)
      if (found[0]) {
        return this.$store.getters['locale/format']('edit_reservation.format', [found[0].name])
      }
      return ''
    }
  }
}
</script>
