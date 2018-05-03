<template lang="pug">
  v-list(dense expand)
    template(v-for="{ group, title, items } in items")
      main-resource-tree-group(
        :group="group"
        :title="title"
        :items="items"
        :selected="value"
        @onChange="onChange"
      )
</template>

<script>
import MainResourceTreeGroup from './MainResourceTreeGroup'

export default {
  components: {
    MainResourceTreeGroup
  },

  props: {
    items: {
      type: Array,
      required: true
    },

    value: {
      type: Array,
      required: true
    }
  },

  methods: {
    onChange(e) {
      if (e.selected && !this.value.includes(e.id)) {
        this.$emit('input', [...this.value].concat(e.id))
      } else if (!e.selected && this.value.includes(e.id)) {
        this.$emit('input', this.value.filter(i => i !== e.id))
      } else {
        console.log(
          `ignore: ${JSON.stringify(this.value)} ${JSON.stringify(e)}`
        )
      }
    }
  }
}
</script>
