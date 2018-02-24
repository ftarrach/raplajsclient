<template lang="pug">
  a.dropdown-item.prevent.stop(@click="selected")
    span.icon(v-if="icon")
      fa-icon(:icon="icon")
    | {{ value }}
</template>

<script>
export default {

  name: 'BDropdownItem',

  props: {
    value: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    }
  },

  methods: {
    selected() {
      this.$parent.toggle()
      this.$emit('click')
    }
  }
}
</script>