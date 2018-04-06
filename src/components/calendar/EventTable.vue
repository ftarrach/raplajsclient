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
               ref="menu"
               :items="menuItems"
               @opened="onMenuOpen"
               @selected="menuSelected")
</template>

<script>

import uuid from 'uuid/v4'

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
      const menu = new org.rapla.client.menu.gwt.VueMenu()
      api.getMenuFactory().addReservationMenu(
        menu,
        context,
        null // afterId
      )
      api.getMenuFactory().addObjectMenu(
        menu,
        context,
        null // afterId
      )
      this.menuItems = this.createMenuItemsFor(menu)
      return menu
    },

    createMenuItemsFor(menu) {
      return menu.getItems().map(i => {
        const id = i.getId()
        if (id == null) {
          const backelement = this.createMenuItem(
            '--BACK--' + uuid(),
            `\u25C0 ${this.$store.getters['locale/localize']('back')}`,
            '',
            () => this.$refs.menu.back()
          )
          backelement.isBack = true
          return {
            label: i.getLabel(),
            icon: i.getIcon(),
            children: [
              backelement, ...this.createMenuItemsFor(i)
            ]
          }
        } else if (id.startsWith('SEPERATOR-')) {
          return {
            seperator: true
          }
        } else {
          return this.createMenuItem(
            id,
            i.getLabel(),
            i.getIcon(),
            () => i.onSelect ? i.onSelect() : {}
          )
        }
      })
    },

    createMenuItem(id, label, icon, action) {
      return { id, label, icon, action }
    },

    showMenu() {
      this.openMenu = true
    },

    menuSelected(selectedId) {
      this.findMenuItem(selectedId, this.menuItems).action()
    },

    findMenuItem(id, menu) {
      for (let item of menu) {
        if (item.id && item.id === id) {
          return item
        } else if (item.children) {
          const result = this.findMenuItem(id, item.children)
          if (result) {
            return result
          }
        }
      }
      return false
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
