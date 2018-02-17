<template lang="pug">
  div
    table.table.is-hoverable.is-fullwidth
      thead
        tr
          th {{ "name" | gwt-localize }}
          th {{ "start_date" | gwt-localize }}
          th.is-hidden-mobile {{ "last_changed" | gwt-localize }}
          th
      tbody
        tr(v-for='event in events' @dblclick="edit(event)")
          td {{ event.name }}
          td {{ event.begin | moment }}
          td.is-hidden-mobile {{ event.lastChange | moment }}
          td
            b-dropdown(is-right)
              b-dropdown-item(v-for="item in dropdownitems" 
                              :key="item.label" 
                              :value="item.label" 
                              :icon="item.icon" 
                              @click="() => item.onClick(event)")
</template>

<script>

export default {

  computed: {
    events() {
      return this.$store.getters.eventsInPeriod
    },

    dropdownitems() {
      return [
        {
          label: this.$rapla.locale.localize('new'),
          icon: 'fa-user',
          onClick: this.create
        },
        {
          label: this.$rapla.locale.localize('edit'),
          icon: 'fa-edit',
          onClick: this.edit
        },
        {
          label: this.$rapla.locale.localize('delete'),
          icon: 'fa-trash-alt',
          onClick: this.remove
        },
        {
          label: this.$rapla.locale.localize('view'),
          icon: 'fa-info-circle',
          onClick: this.show
        },
        {
          label: this.$rapla.locale.localize('copy'),
          icon: 'fa-clipboard',
          onClick: this.copy
        },
        {
          label: this.$rapla.locale.localize('cut'),
          icon: 'fa-cut',
          onClick: this.cut
        }
      ]
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