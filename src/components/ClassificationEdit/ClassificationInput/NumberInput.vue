<template lang="pug">
  v-text-field(
    v-model="val"
    :rules="rules"
  )
</template>

<script>
export default {
  props: {
    value: {
      type: Number
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
        if (
          !this.rules
            .map(rule => rule(newVal))
            .find(r => typeof r !== 'boolean')
        ) {
          this.$emit('input', {
            type: 'NUMBER',
            name: this.name,
            newVal: newVal === '' ? null : parseInt(newVal)
          })
        }
      }
    },

    rules() {
      return [
        n => {
          if (n === null || n === '') {
            return true
          } else {
            return (!isNaN(parseFloat(n)) && isFinite(n)) || 'Zahl erforderlich'
          }
        }
      ]
    }
  }
}
</script>
