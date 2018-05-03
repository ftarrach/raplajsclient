<template lang="pug">
  v-list-tile(
    :key="obj.id"
    @click="calendarChosen(obj.id)"
    :class="classes"
  )
    v-list-tile-title {{ obj.label }}
</template>

<script>
export default {
  props: {
    obj: {
      type: Object, // {id,label}
      required: true
    },

    selected: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    classes() {
      if (this.selected) {
        return [ 'info', 'white--text' ]
      }
      return []
    }
  },

  methods: {
    calendarChosen(id) {
      return this.$emit('input', id)
    }
  }
}
</script>
