<template lang="pug">
  button.button.is-borderless.floating-action-button(:class="classes" @click="onClick")
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
        this.color,
        `is-${this.position}`
      ]
      return classes
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

  @import '../assets/sass/bulma.scss';

  button.floating-action-button {
    position: fixed;
    border-radius: 100%;
    width: 3em;
    height: 3em;
    color: $white !important;
    border: 0 !important;

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

  .green { background: $green; }
  .red { background: $red; }
  .yellow { background: $yellow; }
  .purple { background: $purple; }
  .orange { background: $orange; }
  .turquoise { background: $turquoise; }
  .cyan { background: $cyan; }
  .blue { background: $blue; }

</style>
