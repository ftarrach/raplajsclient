<template lang="pug">
  .appointment(
    @click="onClick"
    :style="cssClasses"
  )
    p(v-for="line in text")
      b(v-if="line.style === 'bold'") {{ line.text }}
      i(v-else-if="line.style === 'italic'") {{ line.text }}
      u(v-else-if="line.style === 'underlined'") {{ line.text }}
      span(v-else) {{ line.text }}
</template>

<script>
import DateTime from '@/types/DateTime'

const emPerHour = 4

export default {
  props: {
    identifier: {
      type: [Number, String],
      required: true
    },

    text: {
      type: Array, // array of { text, style }
      required: false,
      default: () => []
    },

    start: {
      type: DateTime,
      required: true
    },

    end: {
      type: DateTime,
      required: true
    }
  },

  computed: {
    startTime() {
      return this.start.timeObject()
    },

    cssClasses() {
      return {
        top: this.top,
        height: this.height
      }
    },

    top() {
      return (
        this.startTime.hours * emPerHour +
        emPerHour * (this.startTime.minutes / 60) +
        'em'
      )
    },

    height() {
      const length = this.start.timeDifference(this.end)
      return emPerHour * length.hours + emPerHour * (length.minutes / 60) + 'em'
    }
  },

  methods: {
    onClick() {
      this.$emit('click', this.identifier)
    }
  }
}
</script>

<style lang="stylus" scoped>
.appointment
  background #1976d2
  color white
  position absolute
  width 100%
  box-sizing border-box
  overflow hidden

  p
    line-height 1em
    color white
    margin 0
    padding 0.2em
</style>
