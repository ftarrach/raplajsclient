<template lang="pug">
  .select.is-multiple.is-flex.is-size-7-mobile
    b-list-item(v-for="item in items"
                :key="item.id"
                :id="item.id"
                :label="item.label"
                :class="{'selected': value.includes(item.id)}"
                @selected="selected")
</template>

<script>
export default {
  name: 'BList',

  props: {
    items: {
      type: Array, // [{id: String, label: String}]
      required: true
    },

    value: {
      type: Array, // array of selected ids
      required: true
    }
  },

  methods: {
    selected(id) {
      if (this.value.includes(id)) {
        this.$emit('input', this.value.filter(item => item.id !== id))
      } else {
        this.$emit('input', [...this.value, id])
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '/../assets/sass/bulma.scss';

  .select {
    height: 15em;
    display: flex;
    flex-direction: column;
    border: 1px solid $input-border-color;
    overflow-y: auto;
  }
</style>
