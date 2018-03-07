<template lang="pug">
  .item(:class="{ selected }")
    fa-icon(regular icon="folder")
    span.tag.is-rounded {{ selectedInContainer }}
    span.grow {{ item.label }}
    span.is-right &#x25B6;
</template>

<script>
export default {

  name: 'BDrilldownContainer',

  props: {
    item: {
      type: Object,
      required: true
    },

    selected: {
      default: () => null
    },

    values: {
      required: false
    }
  },

  computed: {
    safeValues() {
      if (this.values) {
        return this.values
      } else {
        return []
      }
    },

    selectedInContainer() {
      return this.countChildren(this.item)
    }
  },

  methods: {
    countChildren(item) {
      if (this.values) {
        if (!item.children && this.values.includes(item.id)) {
          return 1
        }
        let count = item.children.reduce((acc, child) => {
          if (child.children) {
            acc += this.countChildren(child)
          } else if (this.values.includes(child.id)) {
            acc++
          }
          return acc
        }, 0)
        if (count > 0) {
          return count
        }
      }
      return null
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '../assets/sass/bulma.scss';

  .item {
    display: flex;
    align-items: center;
    min-height: 2rem;
    padding: 0 .25em;

    &.selected {
      background: $info;
      color: $white;
    }

    .grow {
      flex-grow: 1;
    }

    .tag.is-rounded {
      margin: 0 .25em;
      width: 24px;
      background: none;

      &:not(:empty) {
        background: $info;
        color: $white;
      }
    }

    .is-right {
      margin-right: .25em;
    }
  }
</style>
