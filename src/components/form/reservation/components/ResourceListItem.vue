<template lang="pug">
  .item(:class="{ selected, 'is-father': item.father }")
    fa-icon(regular icon="circle")
    span.tag.is-rounded(:class="{small: item.father}")
    span.grow {{ item.label }}
</template>

<script>
// TODO: style it like in the rapla client
export default {

  props: {
    item: {
      type: Object, // { id, label }
      default: () => {}
    },

    selected: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    allocatable() {
      return this.$store.getters['facade/allocatable'](this.item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/sass/bulma.scss';

  .item {
    display: flex;
    align-items: center;
    min-height: 2rem;
    padding: 0 .25em;

    .tag.is-rounded {
      margin: 0 .25em;
      width: 24px;
      background: none;

      &.small {
        width: 12px;
      }
    }
  }

  .grow { flex-grow: 1 }

  .selected {
    background: $info;
    color: $white;
  }

  .is-father {
    font-style: italic
  }
</style>
