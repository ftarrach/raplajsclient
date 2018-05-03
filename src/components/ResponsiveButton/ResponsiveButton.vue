<template lang="pug">
  v-btn(
    @click="click"
    :flat="flat"
    :icon="$vuetify.breakpoint.smAndDown"
  )
    slot(name="icon" v-if="$vuetify.breakpoint.smAndDown")
    slot(name="text" v-else)
</template>

<script>
/**
 * the button will show as an icon, if size <= md
 */
export default {
  props: {
    flat: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
