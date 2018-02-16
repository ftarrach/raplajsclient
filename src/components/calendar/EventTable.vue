<template lang="pug">
  div
    table.table.is-hoverable.is-fullwidth
      thead
        tr
          th {{ "name" | r-localize }}
          th {{ "start_date" | r-localize }}
          th.is-hidden-mobile {{ "last_changed" | r-localize }}
          th
      tbody
        tr(v-for='event in events' @dblclick="edit(event)")
          td {{ event.name }}
          td {{ event.begin | moment }}
          td.is-hidden-mobile {{ event.lastChange | moment }}
          td
            b-dropdown(is-right)
              b-dropdown-item(value="Neu" icon="fa-plus" @click="create")
              b-dropdown-item(value="Besitzer ändern" icon="fa-user" @click="changeOwner")
              b-dropdown-item(value="Bearbeiten" icon="fa-edit" @click="edit(event)")
              b-dropdown-item(value="Löschen" icon="fa-trash-alt" @click="remove")
              b-dropdown-item(value="Anzeigen" icon="fa-info-circle" @click="show(event)")
              b-dropdown-item(value="Kopieren" icon="fa-clipboard" @click="copy")
              b-dropdown-item(value="Ausschneiden" icon="fa-cut" @click="cut")
</template>

<script>

export default {

  computed: {
    events() {
      return this.$store.getters.eventsInPeriod
    }
  },

  methods: {
    create() {
      alert('create')
    },
    changeOwner() {
      alert('changeOwner')
    },
    remove() {
      // DEBUG: only for demonstration purposes
      // eslint-disable-next-line
      gwtEvents.dialogUiFactoryInterface
               .create(null, null, 'Löschen', 'wirklich löschen?', ['Ja', 'Nein'])
               .start()
               .thenApply(function(resultInt) {
                 alert('user has chosen button nr ' + resultInt)
               })
    },
    edit(event) {
      this.$router.push({
        name: 'EditReservation',
        params: {
          id: event.id
        }
      })
    },
    show(event) {
      alert('show')
    },
    copy() {
      alert('copy')
    },
    cut() {
      alert('cut')
    }
  },

  filters: {
    moment(value) {
      if (!value) return ''
      return value.format('DD.MM.YYYY (dd) HH:mm')
    }
  }
}
</script>