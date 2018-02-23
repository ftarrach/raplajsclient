<template lang="pug">
  button.button(:class="{ 'is-outlined': !selected, 'is-fullwidth': fullwidth, 'is-radiusless': radiusless}"
                @click="onClick()")
    | {{ label }}
</template>

<script>
export default {

  name: 'BToggleButton',

  props: {
    fullwidth: {
      type: Boolean,
      default: () => false
    },
    label: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
    selected: {
      type: Boolean,
      default: () => false
    },
    radiusless: {
      type: Boolean,
      default: () => false
    }
  },

  methods: {
    onClick() {
      this.$emit('click', {
        value: this.value,
        selected: !this.selected
      })
    }
  }
}
</script>

<style scoped>

  .button {
    background-color: #dbdbdb;
  }

  .button.is-outlined {
    border-color: #dbdbdb;
    background-color: white;
  }

</style>
