<template lang="pug">
  div
    table.table.is-hoverable.is-fullwidth
      thead
        tr
          th
          th(v-for="column in columns")
            | {{ column.name }}
          th
      tbody
        tr(v-for='(row, index) in rows' :class="{'selected': selectedIds.includes(row.id)}" :key="row.id")
          td
            input(type="checkbox" :value="row.id" v-model="selectedIds")
          td(v-for="(element) in row.data" @dblclick="edit(index)")
            | {{ element }}
          td
    b-fab-menu(icon="bars"
               color="orange"
               bottom right
               v-if="selectedIds.length > 0"
               :items="menuItems"
               @opened="menuOpened"
               @selected="menuSelected")
</template>

<script>

export default {

  data() {
    return {
      columns: [],
      rows: [],
      selectedIds: [],
      menuItems: []
    }
  },

  computed: {
    dropdownitems() {
      return [
        {
          label: this.$store.getters['locale/localize']('new'),
          icon: 'user',
          onClick: this.create
        },
        {
          label: this.$store.getters['locale/localize']('edit'),
          icon: 'edit',
          onClick: this.edit
        },
        {
          label: this.$store.getters['locale/localize']('delete'),
          icon: 'trash-alt',
          onClick: this.remove
        },
        {
          label: this.$store.getters['locale/localize']('view'),
          icon: 'info-circle',
          onClick: this.show
        },
        {
          label: this.$store.getters['locale/localize']('copy'),
          icon: 'clipboard',
          onClick: this.copy
        },
        {
          label: this.$store.getters['locale/localize']('cut'),
          icon: 'cut',
          onClick: this.cut
        }
      ]
    }
  },

  created() {
    this.$nextTick(() => {
      this.$store.dispatch('calendar/loadReservationTable')
        .then(result => {
          console.log('reservations loaded')
          this.columns = result.columns
          this.rows = result.rows
          this.$options.gwtObjects = result.gwtObjects
        })
        .catch(openErrorDialog)
    })
  },

  methods: {

    menuOpened() {
      const gwtReservations = this.selectedIds.map(id => this.$options.gwtObjects.find(r => r.getId() === id))
      console.log('gwtReservations:')
      const context = new org.rapla.client.menu.SelectionMenuContext(
        null, // focused
        null // popupcontext
      )
      context.setSelectedObjects(api.asSet(gwtReservations))
      const menu = api.getMenuFactory().addObjectMenu(
        new org.rapla.client.menu.gwt.VueMenu(),
        context,
        null
      )
      this.$options.currentMenu = menu
      this.menuItems = menu.getItems().map(i => (
        {
          id: i.getId(),
          label: i.getLabel(),
          icon: i.getIcon(),
          action: i.getAction()
        }))
      this.openMenu = true
    },

    menuSelected(selectedId) {
      console.log(this.menuItems.find(i => i.id === selectedId))
      this.menuItems.find(i => i.id === selectedId).action(null /* popupcontext */)
    }

  }
}
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/bulma.scss';

  .table tbody tr {
    cursor: pointer
  }

  .table td {
    user-select: none;
  }

  .selected {
    background: $cyan !important;
    color: $white;

    td {
      border-color: darken($cyan, 10%);
    }
  }
</style>
