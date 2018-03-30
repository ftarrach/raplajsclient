<template lang="pug">
  div
    .columns.is-gapless.is-mobile
      .column.is-2-mobile.is-2-tablet
        b-button(@click="add" fill icon="plus" no-text).is-success
      .column.is-2-mobile.is-2-tablet
        b-button(@click="remove" fill icon="trash-alt" no-text).is-danger
      .column.is-8
        a.button.is-fullwidth {{ "appointment.search_free" | gwt-localize }}
    .columns.is-gapless
      .column.is-fullwidth
        .select.is-multiple.is-flex.is-size-7-mobile
          appointment-list-item(v-for="appointment in appointments"
                                :key="appointment.id"
                                :class="{'selected': appointment.id === value}"
                                :appointment="appointment"
                                @selected="selected")
</template>

<script>

import AppointmentListItem from './AppointmentListItem'

export default {

  components: {
    AppointmentListItem
  },

  props: {
    value: {
      type: [String, Boolean], // id of selected appointment
      required: true
    }
  },

  computed: {
    appointments() {
      let appointments = this.$store.state.reservationform.appointments
      if (!this.value && appointments.length > 0) {
        this.$emit('input', appointments[0].id)
      }
      return appointments
    }
  },

  methods: {

    add() {
      this.$store.dispatch('reservationform/cloneAppointment', this.value)
    },

    remove() {
      alert('AppointmentList.remove')
    },

    selected(appointment) {
      this.$emit('input', appointment)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/sass/bulma.scss';

  .columns.is-gapless {
    margin-bottom: 0 !important
  }

  .select {
    height: 15em;
    display: flex;
    flex-direction: column;
    border: 1px solid $input-border-color;
    overflow-y: auto;
  }
</style>
