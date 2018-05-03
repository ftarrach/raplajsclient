<template lang="pug">
  v-layout(wrap @dblclick.stop="toggle").tree-level
    v-flex(xs12)
      span.label {{ item.title }}
    v-flex(xs12 v-if="expanded")
      .children(v-if="item.items")
        v-layout(v-for="i in item.items" :key="i.id")
          tree-view-level(:item="i")
</template>

<script>
export default {
  name: 'TreeViewLevel',

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      expanded: true
    }
  },

  methods: {
    toggle() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="stylus" scoped>
  .label
    user-select: none

  .tree-level .tree-level
    padding-left: 1em
</style>
