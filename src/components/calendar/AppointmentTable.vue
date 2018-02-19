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
        td {{ appointment.name }}
        td {{ appointment.begin | gwt-formatDateTime }}
        td.is-hidden-mobile {{ appointment.end | gwt-formatDateTime }}
        td.is-hidden-mobile
          joined-list(:list='appointment.resources | listresources')
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
      return this.$store.getters.appointmentsInPeriod
    }
  },

  filters: {
    listresources(value) {
      if (!value) return ''
      return value.map(r => r.name || 'unbekannte Ressource').sort()
    },
    listpersons(value) {
      if (!value) return ''
      return value.map(p => p.name)
    }
  }

}
</script>
