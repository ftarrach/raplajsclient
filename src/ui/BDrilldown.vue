<template lang="pug">
  div.drilldown
    div.drilldown-menu
      b-button(icon="fa-home" no-text @click="home")
      b-button(icon="fa-arrow-left" no-text pull-right @click="back")
    ul.drilldown-list
      li.drilldown-list-item(v-for="item in itemsForPath" :key="item.id")
        span(v-if="item.children" @click="clickOnContainer(item)")
          slot(name="container" :item="item")
        span(v-else @click="clickOnItem(item)")
          slot(name="item" :item="item")
</template>

<script>
export default {

  name: 'BDrilldown',

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      path: []
    }
  },

  computed: {
    itemsForPath() {
      let level = this.items
      for (let part of this.path) {
        level = level.find(i => i.id === part).children
      }
      return level
    }
  },

  methods: {
    clickOnContainer(container) {
      this.path.push(container.id)
    },

    clickOnItem(item) {
      this.$emit('itemClick', item)
    },

    back() {
      if (this.path) {
        this.path.pop()
      }
    },

    home() {
      this.path = []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/sass/bulma.scss';

  .drilldown-list {
    border: 1px solid $border;

    .drilldown-list-item {
      cursor: pointer;

      &:hover {
        background-color: $white-bis;
      }

      &:not(:last-child) {
        border-bottom: 1px solid $border;
      }
    }
  }
</style>
