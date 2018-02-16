<template lang="pug">
  table.table.is-hoverable.is-fullwidth
    thead
      tr
        th Name
        th Beginn
        th.is-hidden-mobile Ende
        th.is-hidden-mobile Ressourcen
        th.is-hidden-mobile Personen
    tbody
      tr(v-for='appointment in appointments')
        td {{ appointment.name }}
        td {{ appointment.begin | formatDate }}
        td.is-hidden-mobile {{ appointment.end | formatDate }}
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
    formatDate(value) {
      if (!value) return ''
      return value.format('DD.MM.YYYY (dd) HH:mm')
    },
    listresources(value) {
      if (!value) return ''
      return value.map(r => r['name'] || 'unbekannte Ressource').sort()
    },
    listpersons(value) {
      if (!value) return ''
      return value.map(p => `${p.surname} ${p.firstname}`)
    }
  }

}
</script>
