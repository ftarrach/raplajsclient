<template lang="pug">
  .item(slot="item" :class="{selected}")
    span.tag.is-rounded
    span.grow {{ item.label }}
</template>

<script>
export default {

  name: 'BDrilldownItem',

  props: {
    item: {
      type: Object, // { id, label }
      required: true
    },

    selected: {
      type: Boolean,
      required: true
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

    .tag.is-rounded {
      margin: 0 .25em;
      width: 24px;
      background: none;
    }
  }

  .grow { flex-grow: 1 }

  .selected {
    background: $info;
    color: $white;
  }
</style>
