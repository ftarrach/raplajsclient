<template lang="pug">
  .drilldown(:class="{'dynamic-height': this.dynamicHeight}")
    .drilldown-menu(v-if="!noMenu")
        span.path {{ readablePath }}
        .actions
          b-button(icon="home" no-text :disabled="notHome" @click.stop="home")
          b-button(icon="arrow-left" no-text :disabled="notHome" @click.stop="back")
    ul.drilldown-list
      li.drilldown-list-item(v-for="item in itemsForPath" :key="item.id")
        span(v-if="item.children" @click.stop="clickOnContainer(item)")
          slot(name="node" :item="item" :selected="safeValue.includes(item.id)")
        span(v-else @click.stop="clickOnItem(item)")
          slot(name="leaf" :item="item" :selected="safeValue.includes(item.id)")
    .drilldown-footer(v-show="nullable")
      b-button(fill @click.stop="setNull") {{ "nothing_selected" | gwt-localize }}
</template>

<script>
// TODO: Split selected into selected and selectedChildren for containers
// TODO: mayor cleanup needed here. Split drillldown core and drilldown-headier stuff
export default {

  name: 'BDrilldown',

  props: {
    items: {
      type: Array,
      required: true
    },

    noMenu: {
      type: Boolean,
      required: false,
      default: () => false
    },

    value: {
      type: Array, // Array of selected IDs
      required: false,
      default: () => []
    },

    nullable: {
      type: Boolean,
      required: false,
      default: () => false
    },

    multiSelect: {
      type: Boolean,
      required: false,
      default: () => true
    },

    selectableContainer: {
      type: Boolean,
      required: false,
      default: () => false
    },

    dynamicHeight: {
      type: Boolean,
      required: false,
      default: () => false
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
      // TODO: clean up
      let level = this.items
      for (let part of this.path) {
        level = level.find(i => i.id === part).children
      }
      if (this.path.length > 0 && this.selectableContainer) {
        let currentFather = this.currentFatherCategory
        if (currentFather) {
          level = [{id: currentFather.id, label: currentFather.label, father: true}].concat(level)
        }
      }
      return level
    },

    currentFatherCategory() {
      if (this.path.length > 0) {
        let father = false
        let fatheritems = this.items
        for (let part of this.path) {
          father = fatheritems.find(i => i.id === part)
          fatheritems = father.children
        }
        return father
      } else {
        return false
      }
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
    clickOnContainer(container) {
      this.path.push(container.id)
    },
    back() { this.path.pop() },
    home() { this.path = [] },
    setNull() { this.$emit('input', []) },

    clickOnItem(item) {
      let currentlySelected = this.safeValue.includes(item.id)
      if (this.multiSelect) {
        if (currentlySelected) {
          this.$emit('input', this.safeValue.filter(i => i !== item.id))
        } else {
          this.$emit('input', [...this.safeValue, item.id])
        }
      } else {
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
