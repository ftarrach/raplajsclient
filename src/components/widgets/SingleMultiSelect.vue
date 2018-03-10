<template lang="pug">
  include SingleMultiSelect.pug
</template>

<script>
export default {

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    selected: {
      get() {
        return [this.value]
      },
      set(newVal) {
        if (newVal.length === 0) {
          return
        }
        this.$emit('input', newVal[0])
        this.$nextTick(this.$forceUpdate)
      }
    }
  }
}
</script>
