<template lang="pug">
  v-menu(:disabled="disabled")
    template(slot='activator')
      v-btn(flat :disabled="disabled").hidden-sm-and-down
        v-icon(small left) mdi-presentation
        span {{ label }}
        v-icon arrow_drop_down
      v-btn(icon :disabled="disabled").hidden-md-and-up
        v-icon mdi-presentation
    v-list
      template(v-for="view in views")
        chooser-item(
          :obj="view"
          :selected="view.id === value"
          @input="viewChosen"
        )
</template>

<script>

import ChooserItem from './ChooserItem'

export default {

  components: {
    ChooserItem
  },

  props: {
    value: {
    },
    views: {
      type: Array, // array of {id, label}
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  methods: {
    viewChosen(viewId) {
      this.$emit('onChange', viewId)
    }
  }
}
</script>
