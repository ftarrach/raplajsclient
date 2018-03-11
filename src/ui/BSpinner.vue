<template lang="pug">
  .field.has-addons
    .control
      button.button.is-info(@click="decrement")
        fa-icon(icon="minus" small no-text)
    .control
      input.input(v-model="renderedValue"
                  :class="{'is-danger': !validInput }"
                  :disabled="disabled")
    .control
      button.button.is-info(@click="increment")
        fa-icon(icon="plus" small no-text)
</template>

<script>
export default {
  name: 'BSpinner',

  props: {
    value: {
      type: Number
    },

    disabled: {
      type: Boolean,
      default: () => false
    },

    min: {
      type: [Number, String],
      default: () => Number.MIN_SAFE_INTEGER
    },

    max: {
      type: [Number, String],
      default: () => Number.MAX_SAFE_INTEGER
    }
  },

  data() {
    return {
      renderedValue: ''
    }
  },

  created() {
    this.renderedValue = this.value
  },

  watch: {
    renderedValue(newVal) {
      if (this.isValid(newVal)) {
        this.$emit('input', parseInt(newVal))
      }
    }
  },

  computed: {
    validInput() { return this.isValid(this.renderedValue) }
  },

  methods: {
    increment() {
      let newVal = parseInt(this.renderedValue) + 1
      if (this.isValid(newVal)) {
        this.renderedValue += 1
      }
    },

    decrement() {
      let newVal = parseInt(this.renderedValue) - 1
      if (this.isValid(newVal)) {
        this.renderedValue -= 1
      }
    },

    isValid(val) {
      if (/^\d+$/.test(val)) {
        let number = parseInt(val)
        return number >= this.min && number <= this.max
      }
      return false
    }
  }
}
</script>

<style scoped>
  .button .icon {
    width: 1em;
  }
</style>
