<template lang="pug">
  v-list-group(
    :group="group"
    sub-group
  )
    v-list-tile(slot="activator" ripple)
      v-list-tile-content
        v-list-tile-title {{ title }}
    template(v-for="({ id, items, group, title, disabled }, i) in items")
      main-resource-tree-subgroup(
        v-if="items"
        :group="group"
        :title="title"
        :items="items"
        :selected="selected"
      )
      main-resource-tree-item(
        v-else
        :value="id"
        :key="i"
        :title="title"
        :is-selected="selected.includes(id)"
        :disabled="disabled"
        @onChange="onChange"
      )
</template>

<script>
import MainResourceTreeItem from './MainResourceTreeItem'

export default {
  name: 'MainResourceTreeSubgroup',

  components: {
    MainResourceTreeItem
  },

  props: {
    group: { type: String, required: true }, // unique group name for this group
    title: { type: String, required: true }, // name of group presented to the user
    items: { type: Array, required: true }, // Array of all subitems
    selected: { type: Array, required: true } // Array of selected items
  },

  methods: {
    onChange(e) {
      this.$emit('onChange', e)
    }
  }
}
</script>
