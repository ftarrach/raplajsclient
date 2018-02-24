<template lang="pug">
  i.fas(:class="[icon, classes]")
</template>

<script>
export default {

  name: 'FaIcon',

  props: {
    icon: {
      type: String,
      required: true
    },
    pullRight: {
      type: Boolean,
      default: () => false
    }
  },

  computed: {
    classes() {
      return {
        'is-pulled-right': this.pullRight
      }
    }
  }
}
</script>
