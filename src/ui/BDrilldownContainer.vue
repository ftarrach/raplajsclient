<template lang="pug">
  .item(slot="container" slot-scope="{ item }" :class="{'selected' : typeof selected === 'boolean' }")
    p {{ amount(items) }}
    //    fa-icon(regular icon="folder")
    //    span.tag.is-rounded {{ selected }}
    //    span.grow {{ item.label }}
    //    span.is-right &#x25B6;
</template>

<script>
export default {

  name: 'BDrilldownContainer',

  props: {
    item: {
      type: Object,
      required: true
    },

    amount: {

    },

    selected: {
      default: () => null
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
