<template lang="pug">
  v-list-group(:group="group")
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
        @onChange="onChange"
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
import MainResourceTreeSubgroup from './MainResourceTreeSubgroup'

export default {

  name: 'MainResourceTreeGroup',

  components: {
    MainResourceTreeItem,
    MainResourceTreeSubgroup
  },

  props: {
    group: { type: String, required: true }, // unique group name for this group
    items: { type: Array, required: true }, // Array of all subitems
    selected: { type: Array, required: true }, // Array of selected subitems
    title: { type: String, required: true } // name of group presented to the user
  },

  methods: {
    onChange(e) { this.$emit('onChange', e) }
  }
}
</script>
