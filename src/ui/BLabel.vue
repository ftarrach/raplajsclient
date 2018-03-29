<template lang="pug">
  p(:class="classes") {{ text }}
</template>

<script>
export default {

  name: 'BLabel',

  props: {
    text: {
      type: String,
      required: true
    },

    color: {
      required: false,
      default: () => null
    }
  },

  computed: {
    classes() {
      return this.color
    }
  }

}
</script>
