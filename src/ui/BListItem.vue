<template lang="pug">
  .item(@click="selected")
    p {{ label }}
</template>

<script>

export default {

  name: 'BListItem',

  props: {
    id: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    }
  },

  methods: {
    selected() {
      this.$emit('selected', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/sass/bulma.scss';

  .item {
    display: block;
    line-break: normal;
    cursor: pointer;
    padding: .25em 1em;
  }

  .selected {
    background-color: $info;
    color: white;
  }
</style>
