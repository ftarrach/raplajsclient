<template lang="pug">
  div(:class="classes" @click="toggleSelect")
    v-list-tile(
      :disabled="disabled"
      ripple
    )
      v-list-tile-content
        v-list-tile-title
          span {{ title }}
</template>

<script>
export default {
  props: {
    title: { type: String, required: true }, // name of group presented to the user
    isSelected: { type: Boolean, required: true }, // has the user activated this item?

    disabled: { type: Boolean, required: false, default: () => false },

    value: { type: String, required: true }
  },

  computed: {
    classes() {
      let classes = []
      if (this.isSelected) {
        classes.push('blue')
        classes.push('white--text')
      }
      return classes
    }
  },

  methods: {
    toggleSelect() {
      this.$emit('onChange', {
        id: this.value,
        selected: !this.isSelected
      })
    }
  }
}
</script>
