<template lang="pug">
  div
    .columns.is-gapless.is-mobile
      .column.is-2-mobile.is-2-tablet
        a.button.is-fullwidth.is-success(@click="add")
          fa-icon(icon="plus")
      .column.is-2-mobile.is-2-tablet
        a.button.is-fullwidth.is-danger(@click="remove")
          fa-icon(icon="trash-alt")
      .column.is-8
        a.button.is-fullwidth {{ "appointment.search_free" | gwt-localize }}
    .columns.is-gapless
      .column.is-fullwidth
        .select.is-multiple.is-flex.is-size-7-mobile
          appointment-list-item(v-for="appointment in appointments"
                                :key="appointment.id"
                                :class="{'selected': appointment.id === value}"
                                :appointment="appointment"
                                @input="selected")
</template>

<script>
// TODO: externalize label methods to ReservationFormAppointmentlistItem
import SingleMultiSelect from '@/components/widgets/SingleMultiSelect'
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
      this.$store.dispatch('reservationform/addAppointment', this.value)
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
