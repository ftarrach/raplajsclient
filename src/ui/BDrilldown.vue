<template lang="pug">
  .drilldown
    .drilldown-menu
        span.path {{ readablePath }}
        .actions
          b-button(icon="fa-home" no-text :disabled="notHome" @click="home")
          b-button(icon="fa-arrow-left" no-text :disabled="notHome" @click="back")
    ul.drilldown-list
      li.drilldown-list-item(v-for="item in itemsForPath" :key="item.id")
        span(v-if="item.children" @click="clickOnContainer(item)")
          slot(name="container" :item="item" :selected="selectedInContainer(item)")
        span(v-else @click="clickOnItem(item)")
          slot(name="item" :item="item" :selected="safeValue.includes(item.id)")
    .drilldown-menu2
      b-button(fill @click="setNull") {{ "nothing_selected" | gwt-localize }}
</template>

<script>
// TODO: single/multiselectmode etc
export default {

  name: 'BDrilldown',

  props: {
    items: {
      type: Array,
      required: true
    },

    value: {
      type: Array, // Array of selected IDs
      required: false,
      default: () => []
    },

    multiSelect: {
      type: Boolean,
      required: false,
      default: () => true
    }
  },

  data() {
    return {
      path: []
    }
  },

  computed: {

    safeValue() {
      if (this.value) {
        return this.value
      } else {
        return []
      }
    },

    itemsForPath() {
      let level = this.items
      for (let part of this.path) {
        level = level.find(i => i.id === part).children
      }
      return level
    },

    notHome() { return this.path.length === 0 },
    readablePath() {
      let level = this.items
      let path = ''
      for (let part of this.path) {
        let item = level.find(i => i.id === part)
        path += ` › ${item.label}`
        level = level.find(i => i.id === part).children
      }
      if (!path) {
        path = ' › '
      }
      return path
    }
  },

  methods: {
    clickOnContainer(container) { this.path.push(container.id) },
    back() { this.path.pop() },
    home() { this.path = [] },
    setNull() { this.$emit('input', []) },

    clickOnItem(item) {
      if (this.multiSelect) {
        if (this.safeValue.includes(item.id)) {
          this.$emit('input', this.safeValue.filter(i => i !== item.id))
        } else {
          let newVal = [...this.safeValue]
          newVal.push(item.id)
          this.$emit('input', newVal)
        }
      } else {
        this.$emit('input', [item.id])
      }
    },

    selectedInContainer(item) {
      let count = item.children.reduce((acc, child) => {
        if (child.children) {
          acc += this.selectedInContainer(child)
        } else if (this.safeValue.includes(child.id)) {
          acc++
        }
        return acc
      }, 0)
      if (count > 0) {
        return count
      }
      return null
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
    border: 1px solid $border
  }

  .drilldown-menu {
    border-bottom: 1px solid $border;
    display: flex;
    align-items: center;
    font-size: .75em;

    .path {
      flex-grow: 1;
      padding-left: .25em;
    }

    .button {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .drilldown-list {
    flex-grow: 1;
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
