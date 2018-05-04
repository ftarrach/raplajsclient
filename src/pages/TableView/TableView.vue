<template lang="pug">
  .table-view
    v-container(fluid grid-list-md)
      v-layout(row wrap)
        v-flex(xs12 sm6)
          dialog-date-picker(v-model="start.date" label="Von")
        v-flex(xs12 sm6)
          dialog-date-picker(v-model="end.date" label="Bis")
    dynamic-table(
      :rows="rows"
      :columns="columns"
      v-model="selected"
    )
    dynamic-menu(
      close-on-select
      :items="menuItems"
      :title="menuTitle"
      @before-open="loadMenu"
      @selected="onMenuSelect"
    )
      v-btn(
        slot="activator"
        fab color="orange"
        fixed dark
        bottom right
      )
        v-icon menu
</template>

<script>
import DynamicMenu from '@/components/DynamicMenu/DynamicMenu'
import DynamicTable from '@/components/DynamicTable/DynamicTable'
import DialogDatePicker from '@/ui//DialogDatePicker'
import createMenu from './createMenu'
import createTable from './createTable'
import DateTime from '@/types/DateTime'

export default {
  components: {
    DynamicTable,
    DynamicMenu,
    DialogDatePicker
  },

  props: {
    viewId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      start: null,
      end: null,
      selected: [],
      menuItems: [],
      menuTitle: '',
      columns: [],
      rows: []
    }
  },

  created() {
    if (window.api) {
      this.loadPeriodFromGwt()
      this.$root.$on('gwt-update-view', this.updateView)
    } else {
      // NOTE: standalone data
      this.start = DateTime.createFromJsDate(new Date())
      this.end = this.start
    }
    this.$nextTick(() => {
      this.load()
    })
  },

  beforeDestroy() {
    this.$root.$off('gwt-update-view', this.updateView)
  },

  methods: {
    load() {
      this.selected = []
      createTable()
        .then(({ columns, rows, gwtObjects }) => {
          this.columns = columns
          this.rows = rows
          this.gwtObjects = gwtObjects
        })
        .catch(window.openErrorDialog)
    },

    loadMenu() {
      const menu = createMenu(
        this.gwtObjects,
        this.selected,
        this.focusedGwtObject()
      )
      this.menuTitle = menu.title
      this.menuItems = menu.menuItems
      this.gwtMenu = menu.gwtMenu
    },

    onMenuSelect(item) {
      if (item.action) {
        item.action()
      }
    },

    loadPeriodFromGwt() {
      this.start = DateTime.createFromJsDate(
        api.toJsDate(window.api.calendarModel.getStartDate())
      )
      this.end = DateTime.createFromJsDate(
        api.toJsDate(window.api.calendarModel.getEndDate())
      )
    },

    focusedGwtObject(id) {
      return this.selected.length === 1
        ? this.gwtObjects.find(i => i.getId() === this.selected[0])
        : null
    },

    updateView(modificationEvent) {
      console.log(`TableView.updateView(${modificationEvent})`)
      this.load()
    }
  },

  watch: {
    viewId(newViewId) {
      this.load()
    }
  }
}
</script>
