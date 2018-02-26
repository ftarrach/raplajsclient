<template lang="pug">
  .columns
    .is-half(v-for="attribute in value")
      label.label {{ attribute.name }}
      input.input(v-model="attribute.value")
</template>

<script>
export default {
  // TODO: show input dependent on type of attribute
  props: {
    value: {
      type: Array, // array of attributes
      required: true
    }
  }
}
</script>

<style>

</style>
