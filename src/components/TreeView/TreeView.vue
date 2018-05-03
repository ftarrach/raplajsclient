<template lang="pug">
  div
    div(v-for="i in items")
      tree-view-level(:item="i")
</template>

<script>

import TreeViewLevel from './TreeViewLevel'

export default {
  name: 'TreeView',

  components: {
    TreeViewLevel
  },

  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  p
    padding: 1em;


</style>
