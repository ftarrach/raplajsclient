<template lang="pug">
  .item
    fa-icon(regular icon="icon" v-if="icon")
    span.grow {{ item.label }}
</template>

<script>
export default {

  name: 'BDrilldownMenuItem',

  props: {
    item: {
      type: Object, // { id, label }
      default: () => {}
    },

    icon: {
      type: String,
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
  }

  .grow { flex-grow: 1 }

</style>