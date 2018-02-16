<template lang="pug">
  button.button(:class="cssClasses" @click="emitClick")
    span.icon.is-small(v-if="icon && !iconRight")
      i.fas(:class="[icon]")
    span(v-if="!noText")
      slot
    span.icon.is-small(v-if="icon && iconRight")
      i.fas(:class="[icon]")
</template>

<script>
export default {

  name: 'BButton',

  props: {
    icon: {
      type: String,
      default: ''
    },
    'pull-right': {
      type: Boolean,
      default: () => false
    },
    'icon-right': {
      type: Boolean,
      default: () => false
    },
    'no-text': {
      type: Boolean,
      default: () => false
    }
  },

  computed: {
    cssClasses() {
      return {
        'is-pulled-right': this.pullRight
      }
    }
  },

  methods: {
    emitClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
