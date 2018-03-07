<template lang="pug">
  i.icon(:class="[style, faIcon, classes]")
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
      required: false,
      default: () => false
    },

    regular: {
      type: Boolean,
      required: false,
      default: () => false
    },

    small: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  computed: {
    style() {
      return this.regular ? 'far' : 'fas'
    },

    classes() {
      return {
        'is-pulled-right': this.pullRight,
        'fa-xs': this.small
      }
    },

    faIcon() {
      return `fa-${this.icon}`
    }
  }
}
</script>
