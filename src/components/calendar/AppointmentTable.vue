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
      tr(v-for='appointment in appointments' :key="appointment.id")
        td {{ appointment.name }}
        td {{ appointment.start | gwt-formatDateTime }}
        td.is-hidden-mobile {{ appointment.end | gwt-formatDateTime }}
        td.is-hidden-mobile
          joined-list(:list='appointment.resources')
        td.is-hidden-mobile
          joined-list(:list='appointment.persons')
</template>

<script>

import JoinedList from '@/components/util/JoinedList'

export default {
  components: {
    JoinedList
  },

  data() {
    return {
      appointments: []
    }
  },

  created() {
    this.$store.dispatch('calendar/loadAppointmentBlocks')
      .then(blocks => {
        this.appointments = blocks
      })
      .catch(console.error)
  },

  methods: {
    findReservation(id) {
      return this.$store.getters['calendar/reservation'](id)
    },

    findAllocatable(id) {
      return this.$store.getters['facade/allocatable'](id)
    },

    list(allocatables) {
      if (!allocatables) return ''
      return allocatables.map(id => this.findAllocatable(id).name)
    }
  }
}
</script>
