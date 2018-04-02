<template lang="pug">
  button.button.is-borderless.floating-action-button.fixed-corner(:class="classes" @click="onClick")
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
      default: () => false
    },

    left: {
      type: Boolean,
      default: () => false
    },

    right: {
      type: Boolean,
      default: () => false
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
    border-radius: 100%;
    width: 3em;
    height: 3em;
    color: $white !important;
    border: 0 !important;
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
