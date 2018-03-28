<template lang="pug">
  div
    reservation-form(:id="id" v-show="ready")

</template>

<script>

import ReservationForm from '@/components/form/reservation/ReservationForm'

export default {
  components: {
    ReservationForm
  },

  data() {
    return {
      ready: false
    }
  },

  computed: {
    id() {
      return this.$route.params.id
    }
  },

  methods: {
    prepareStore() {
      this.loadReservation()
    },

    loadReservation() {
      this.$store.getters['calendar/reservation'](this.id)
        .then(persistent => {
          if (persistent) {
            this.$store.commit('reservationform/markAsEdit')
            this.$store.dispatch('reservationform/editReservation', persistent)
            window.reservation = persistent
          } else {
            console.log(`calendar/reservation returned ${persistent}`)
            console.error(`No reservation with id ${this.id} found`)
          }
          this.ready = true
        }).catch(e => {
          console.error(e)
        })
    }
  },

  created() {
    this.prepareStore()
  }
}
</script>
