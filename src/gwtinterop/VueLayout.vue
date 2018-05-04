<template lang="pug">
  v-layout(v-bind="this.$props")
    slot
</template>

<script>
export default {
  name: 'VueLayout',

  props: {
    column: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
  .horizontal-flex {
    display: flex;
    flex-direction: row;
  }

  .horizontal-flex > * {
    flex-grow: 1
  }
</style>
