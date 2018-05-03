<template lang="pug">
  v-checkbox(
    v-model="val"
  )
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
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
          type: 'BOOLEAN',
          name: this.name,
          newVal
        })
      }
    }
  }
}
</script>
