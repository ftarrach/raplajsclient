<template lang="pug">
  table.table.is-hoverable.is-fullwidth
    thead
      tr
        th {{ "name" | gwt-localize }}
        th {{ "start_date" | gwt-localize }}
        th.is-hidden-mobile {{ "end_date" | gwt-localize }}
        th.is-hidden-mobile {{ "resources" | gwt-localize }}
        th.is-hidden-mobile {{ "persons" | gwt-localize }}
    tbody
      tr(v-for='appointment in appointments')
        td {{ reservationName(appointment) }}
        td {{ appointment.start | gwt-formatDateTime }}
        td.is-hidden-mobile {{ appointment.end | gwt-formatDateTime }}
        td.is-hidden-mobile
          joined-list(:list='appointment.allocatables | listresources')
        td.is-hidden-mobile
          joined-list(:list='appointment.persons | listpersons')
</template>

<script>

import JoinedList from '@/components/util/JoinedList'

export default {
  components: {
    JoinedList
  },

  computed: {
    appointments() {
      return this.$store.state.calendar.appointments
    }
  },

  created() {
    this.$store.dispatch('calendar/loadAppointments')
  },

  methods: {
    findReservation(id) {
      return this.$store.getters['calendar/reservation'](id)
    },

    reservationName(appointment) {
      // HACK: add type name to reservation which calls .getName() on gwt object
      return this.findReservation(appointment.reservationId).classification.data.name
    }
  },

  filters: {
    listresources(value) {
      if (!value) return ''
      // HACK: see above
      // TODO: distinguish persons and resources
      return value.map(r => r.classification.data.name || 'unbekannte Ressource').sort()
    },
    listpersons(value) {
      if (!value) return ''
      return value.map(p => p.name)
    }
  }

}
</script>
