<template lang="pug">
  div.drilldown
    div.drilldown-menu.columns.is-gapless.is-marginless
      .column
        span {{ readablePath }}
        .is-pulled-right
          b-button(icon="fa-home" no-text pull-right :disabled="notHome" @click="home")
          b-button(icon="fa-arrow-left" no-text pull-right :disabled="notHome" @click="back")
    ul.drilldown-list
      li.drilldown-list-item(v-for="item in itemsForPath" :key="item.id")
        span(v-if="item.children" @click="clickOnContainer(item)")
          slot(name="container" :item="item")
        span(v-else @click="clickOnItem(item)")
          slot(name="item" :item="item")
</template>

<script>
// TODO: selected item(s), single/multiselectmode etc
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
    },

    readablePath() {
      return ' › ' + this.path.map(id => this.items.find(i => i.id === id).label).join(' › ')
    }
  },

  methods: {
    clickOnContainer(container) {
      console.log('click')
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
  }

  .drilldown-list {
    flex-grow: 1;
    border: 1px solid $border;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .drilldown-list-item {
      cursor: pointer;
      border-bottom: 1px solid $border;

      @include touch {
        padding: 0.5em
      }

      &:hover {
        background-color: $white-bis;
      }
    }
  }
</style>
