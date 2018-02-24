<template lang="pug">
  ul.steps(:class="stepClasses")
    li.steps-segment(:class="classOf(item)"
                     v-for="item in items")
      span.steps-marker(@click="fire(item)")
        fa-icon(:icon="item.icon")
</template>

<script>
export default {
  name: 'BSteps',

  props: {
    // selected id
    value: {
      type: [Number, String],
      required: true
    },

    items: {
      type: Array,
      default: () => []
    },

    mediumDots: { type: Boolean, default: () => false },
    alwaysHorizontal: { type: Boolean, default: () => false }
  },

  computed: {
    stepClasses() {
      let classes = []
      if (this.mediumDots) {
        classes.push('is-medium')
      }
      if (this.alwaysHorizontal) {
        classes.push('is-horizontal')
      }
      return classes
    }
  },

  methods: {
    classOf(item) {
      if (this.value === item.id) {
        return ['is-active']
      }
      return []
    },
    fire(item) {
      this.$emit('input', item.id)
    }
  }

}
</script>

<style scoped>
  .steps-marker {
    cursor: pointer;
    user-select: none;
  }
</style>
