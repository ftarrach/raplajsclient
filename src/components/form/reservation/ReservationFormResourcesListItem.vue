<template lang="pug">
  .list-item(@click="sendClickEvent")
    .columns
      .column.is-half
        span.icon.is-small.has-text-success(v-if="isFree")
          fa-icon(icon="fa-check-circle")
        span.icon.is-small.has-text-warning(v-else-if="isSometimesFree")
          fa-icon(icon="fa-exclamation-circle")
        span.icon.is-small.has-text-danger(v-else-if="isNotFree")
          fa-icon(icon="fa-times-circle")
        span.text {{ resource.name }}
      .column.is-half
        slot
</template>

<script>

export default {

  props: {
    resource: {
      type: Object, // Resource Object
      required: true
    }
  },

  computed: {
    isFree() {
      return this.resource.free && typeof this.resource.free === 'boolean'
    },
    isSometimesFree() {
      return this.resource.free instanceof Array
    },
    isNotFree() {
      return !this.resource.free && typeof this.resource.free === 'boolean'
    }
  },

  methods: {
    sendClickEvent() {
      this.$emit('click', this.resource)
    }
  }
}
</script>

<style scoped>
  .icon {
    margin-left: .25em;
    margin-right: .5em;
  }

  .list-item {
    border-bottom: 1px solid #dbdbdb;
    padding: 0.5em;
    cursor: pointer;
  }
</style>
