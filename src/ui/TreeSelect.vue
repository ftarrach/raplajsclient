<template lang="pug">
  popup-menu(
    :selected="safeValue"
    :items="items"
    @selected="onSelect"
    :selectable-groups="selectableGroups"
  )
    v-btn(slot="activator") {{ currentValue }}
</template>

<script>
import PopupMenu from './PopupMenu'

export default {
  name: 'TreeSelect',

  components: {
    PopupMenu
  },

  props: {
    value: {
      type: Array, // array of ids
      required: false,
      default: () => []
    },

    items: {
      type: Array,
      required: false,
      default: () => []
    },

    title: {
      type: String,
      required: false
    },

    elementName: {
      type: String,
      required: false
    },

    multiSelect: {
      type: Boolean,
      required: false,
      default: () => false
    },

    selectableGroups: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  computed: {
    safeValue: {
      get() {
        if (this.value) {
          return this.value
        } else {
          return []
        }
      }
    },

    currentValue() {
      if (this.title) {
        return this.title
      }
      if (this.value.length > 0) {
        if (this.elementName) {
          return this.safeValue.map(e => this.find(e, this.items)[this.elementName]).join(', ')
        }
        return this.safeValue.join()
      }
      return 'null'
    }
  },

  methods: {

    find(id, env) {
      for (const obj of env) {
        if (obj.id === id) {
          return obj
        }
        if (obj.items) {
          const needle = this.find(id, obj.items)
          if (needle) return needle
        }
      }
      return false
    },

    onSelect(item) {
      let currentlySelected = this.safeValue.includes(item.id)
      if (this.multiSelect) {
        // Multi Select Mode
        if (currentlySelected) {
          this.$emit('input', this.safeValue.filter(i => i !== item.id))
        } else {
          this.$emit('input', [...this.safeValue, item.id])
        }
      } else {
        // Single Select Mode
        if (currentlySelected) {
          this.$emit('input', [])
        } else {
          this.$emit('input', [item.id])
        }
      }
    }
  }
}
</script>

