<template lang="pug">
  div.drilldown
    div.drilldown-menu.columns.is-gapless.is-marginless
      .column.is-half
        b-button(icon="fa-home" no-text fill :disabled="notHome" @click="home")
      .column.is-half
        b-button(icon="fa-arrow-left" no-text fill :disabled="notHome" pull-right @click="back")
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
    },
    notHome() {
      return this.path.length === 0
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

  .drilldown {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 100%;
  }

  .drilldown-list {
    flex-grow: 1;
    border: 1px solid $border;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .drilldown-list-item {
      cursor: pointer;

      &:hover {
        background-color: $white-bis;
      }

      &:not(:last-child),
      &:only-child {
        border-bottom: 1px solid $border;
      }
    }
  }
</style>
