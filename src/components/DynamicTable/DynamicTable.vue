<template lang="pug">
  v-card.grey.lighten-3
    v-card-title
      v-flex(xs12)
        v-data-table.elevation-1(
          v-model='selected'
          :headers='headers'
          :items='items'
          select-all
          hide-actions
          class="elevation-1"
        )
          template(slot='headers', slot-scope='props')
            tr
              th
                v-checkbox(
                  primary
                  hide-details
                  @click.native='toggleAll'
                  :input-value='props.all'
                  :indeterminate='props.indeterminate'
                )
              th(
                v-for='header in props.headers'
                :key='header.text'
                :class="['column']"
              ).text-sm-left
                | {{ header.text }}
          template(slot='items' slot-scope='props')
            tr(
              :active="props.selected"
              @click="props.selected = !props.selected"
            )
              td
                v-checkbox(
                  primary
                  hide-details
                  :input-value="props.selected"
                )
              td(v-for="it in noId(props.item)") {{ it }}
</template>

<script>
export default {
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    value: { type: Array, required: true }
  },

  computed: {
    headers() {
      let i = 1
      return this.columns.map(col => {
        return { text: col.name, value: `d${i++}` }
      })
    },

    items() {
      return this.rows.map(row => {
        let i = 1
        let data = { id: row.id }
        for (let d of row.data) {
          data['d' + i] = d
          i++
        }
        return data
      })
    },

    selected: {
      get() {
        return this.rows.filter(row => this.value.includes(row.id))
      },
      set(newVal) {
        return this.$emit('input', newVal.map(i => i.id))
      }
    }
  },

  methods: {
    noId(it) {
      return Object.keys(it).filter(key => key !== 'id').map(key => it[key])
    },

    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    }
  }
}
</script>
