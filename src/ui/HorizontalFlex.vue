<template lang="pug">
  .horizontal-flex
    slot
</template>

<script>
export default {
  name: 'HorizontalFlex'
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
