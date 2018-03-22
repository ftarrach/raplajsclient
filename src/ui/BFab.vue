<template lang="pug">
  button.button.floating-action-button(:class="classes" @click="onClick")
    fa-icon(:icon="icon" small)
</template>

<script>
export default {
  name: 'BFab',

  props: {
    icon: {
      type: String,
      required: true
    },

    color: {
      type: String,
      required: false,
      default: () => 'green'
    },

    top: {
      type: Boolean,
      default: () => false
    },

    bottom: {
      type: Boolean,
      default: () => true
    },

    left: {
      type: Boolean,
      default: () => false
    },

    right: {
      type: Boolean,
      default: () => true
    }
  },

  computed: {
    classes() {
      const classes = [
        this.bulmaColor,
        `is-${this.position}`
      ]
      return classes
    },

    bulmaColor() {
      switch (this.color) {
        case 'green': return 'is-success'
      }
    },

    position() {
      const horizontal = this.left ? 'left' : 'right'
      const vertical = this.top ? 'top' : 'bottom'
      return `${vertical}-${horizontal}`
    }
  },

  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped lang="scss">
  button.floating-action-button {
    position: fixed;
    border-radius: 100%;
    width: 3em;
    height: 3em;

    &.is-top-left {
      top: 4em;
      left: 2em;
    }

    &.is-top-right {
      top: 4em;
      right: 2em;
    }

    &.is-bottom-left {
      bottom: 2em;
      left: 2em;
    }

    &.is-bottom-right {
      bottom: 2em;
      right: 2em;
    }
}
</style>
