<template lang="pug">
  v-text-field(v-model="val")
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },

    name: {
      type: String,
      required: true
    }
  },

  computed: {
    val: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', {
          type: 'STRING',
          name: this.name,
          newVal
        })
      }
    }
  }
}
</script>
