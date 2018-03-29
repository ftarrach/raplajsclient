<template lang="pug">
  .vertical-flex
    slot
</template>

<script>
export default {
  name: 'VerticalFlex'
}
</script>

<style>
  .vertical-flex {
    display: flex;
    flex-direction: column;
  }
</style>
