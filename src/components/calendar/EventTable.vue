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
               @opened="onMenuOpen"
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

    onMenuOpen() {
      const DEBUG = false
      let menu = []
      if (!DEBUG) {
        menu = this.createMenuFromGwt()
        this.$options.currentMenu = menu
      } else {
        menu = api.testMenu() // DEBUG: calls api.testMenu() instead of real one
      }
      this.showMenu()
    },

    createMenuFromGwt() {
      const gwtReservations = this.selectedIds.map(id => this.$options.gwtObjects.find(r => r.getId() === id))
      const context = new org.rapla.client.menu.SelectionMenuContext(
        this.focusedGwtObject(),
        null // popupcontext
      )
      context.setSelectedObjects(api.asSet(gwtReservations))
      const menu = api.getMenuFactory().addObjectMenu(
        new org.rapla.client.menu.gwt.VueMenu(),
        context,
        null // afterId
      )
      this.createMenuItemsFor(menu)
      return menu
    },

    createMenuItemsFor(menu) {
      this.menuItems = menu.getItems().map(i => {
        if (i.getId().startsWith('SEPERATOR-')) {
          return {seperator: true}
        } else {
          return {
            id: i.getId(),
            label: i.getLabel(),
            icon: i.getIcon(),
            action: i.getAction()
          }
        }
        // TODO: add submenues
      })
    },

    showMenu() {
      this.openMenu = true
    },

    menuSelected(selectedId) {
      this.menuItems.find(i => i.id === selectedId).action(null /* popupcontext */)
    },

    focusedGwtObject(id) {
      return this.selectedIds.length === 1
        ? this.$options.gwtObjects.find(i => i.getId() === this.selectedIds[0])
        : null
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
