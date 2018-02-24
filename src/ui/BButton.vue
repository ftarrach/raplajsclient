<template lang="pug">
  button.button(:class="cssClasses" :disabled="disabled" @click="emitClick")
    span.icon.is-small(v-if="icon && !iconRight")
      fa-icon(:icon="icon")
    span(v-if="!noText")
      slot
    span.icon.is-small(v-if="icon && iconRight")
      fa-icon(:icon="icon")
</template>

<script>
export default {

  name: 'BButton',

  props: {
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: () => false
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
    },
    fill: {
      type: Boolean,
      default: () => false
    }
  },

  computed: {
    cssClasses() {
      return {
        'is-pulled-right': this.pullRight,
        'is-fullwidth': this.fill
      }
    }
  },

  methods: {
    emitClick(e) {
      this.$emit('click', e)
    }
  },

  watch: {
    disabled(old, newVal) {
      if (old && !newVal) {
        this.$el.blur()
      }
    }
  }
}
</script>
