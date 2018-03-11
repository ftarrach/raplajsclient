<template lang="pug">
  input.input(type="text"
              v-model="renderedTime"
              :class="{'is-danger': !validInput }"
              :disabled="disabled")
</template>

<script>
export default {
  name: 'BTimepicker',

  props: {
    value: {
      type: String,
      required: true
    },

    disabled: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      renderedTime: ''
    }
  },

  created() {
    this.renderedTime = this.value
  },

  watch: {
    renderedTime(newVal) {
      if (this.isValid(newVal)) {
        this.$emit('input', newVal)
      }
    }
  },

  computed: {
    validInput() { return this.isValid(this.renderedTime) }
  },

  methods: {
    isValid(val) {
      return /^\d{2}:\d{2}$/.test(val)
    }
  }
}
</script>