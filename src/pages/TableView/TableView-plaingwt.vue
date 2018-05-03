<template lang="pug">
  .table-view
    v-container(fluid grid-list-md)
      v-layout(row wrap)
        v-flex(xs12 sm6)
          dialog-date-picker(v-model="start" label="Von")
        v-flex(xs12 sm6)
          dialog-date-picker(v-model="end" label="Bis")
        v-flex(xs12 sm6)
          v-btn(@click="test") test
        v-flex(xs12 sm6)
          v-text-field(
            v-mmm="$options.text"
            @input="test"
          )
    dynamic-table(
      :rows="rows"
      :columns="$options.columns"
      v-model="selected"
    )
    dynamic-menu(
      v-show="selected.length > 0"
      @before-open="loadMenu"
      :items="menuItems"
    )
</template>

<script>
// TODO: java objects with public variables
// TODO: or: don't map and use $options.gwtObjects
import DynamicMenu from '@/components/DynamicMenu/DynamicMenu'
import DynamicTable from '@/components/DynamicTable/DynamicTable'
import DialogDatePicker from '@/ui//DialogDatePicker'
import createMenu from './createMenu'
import createTable from './createTable'

export default {
  components: {
    DynamicTable,
    DynamicMenu,
    DialogDatePicker
  },

  data() {
    return {
      start: null,
      end: null,
      selected: [],
      menuItems: [],
      dirty: 0
    }
  },

  computed: {
    rows() {
      this.dirty
      return this.$options.rows
    }
  },

  created() {
    // TODO: this data comes from api.calendarModel.getStart() / .getEnd()
    this.start = new Date().toISOString().slice(0, 10)
    this.end = this.start
    this.$options.columns = []
    this.$options.rows = []
    this.$options.text = 'hi'
    // TODO: move rows into a store
    this.$nextTick(() => {
      createTable()
        .then(({ columns, rows, gwtObjects }) => {
          setTimeout(() => {
            console.log('set')
            this.$options.columns = columns
            this.$options.rows = rows
            this.$options.gwtObjects = gwtObjects
            this.dirty++
            this.$forceUpdate()
          }, 1000)
        })
        .catch(console.error)
    })
  },

  methods: {
    loadMenu() {
      this.menuItems = createMenu(this.$options.gwtObjects, this.selected)
    },

    test() {
      this.$options.rows = []
      this.$forceUpdate()
    }
  }
}
</script>
