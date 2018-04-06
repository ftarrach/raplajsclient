<template lang="pug">
  button.button(:class="cssClasses" :disabled="disabled" @click.stop="emitClick")
    span.icon.is-small(v-if="icon && !iconRight")
      fa-icon(:icon="icon")
    span(v-if="!noText")
      span(v-if="label") {{ label }}
      slot(v-else)
    span.icon.is-small(v-if="icon && iconRight")
      fa-icon(:icon="icon")
</template>

<script>
export default {

  name: 'BButton',

  props: {
    icon: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    },
    'pull-right': {
      type: Boolean,
      required: false,
      default: () => false
    },
    'icon-right': {
      type: Boolean,
      required: false,
      default: () => false
    },
    'no-text': {
      type: Boolean,
      required: false,
      default: () => false
    },
    fill: {
      type: Boolean,
      required: false,
      default: () => false
    },
    label: {
      type: [ String, Boolean ],
      required: false,
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
      // build from vue
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
