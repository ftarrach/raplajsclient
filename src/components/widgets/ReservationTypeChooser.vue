<template lang="pug">
  .dropdown.r-fullwidth(:class='{ "is-active": open }')
    .dropdown-trigger.r-fullwidth
      button.button.is-fullwidth(@click='toggleMenu')
        span.dropdown-text {{ selectedItemName }}
        span.icon.is-small
          i.fa.fa-angle-down
    .dropdown-menu.r-fullwidth(role='menu')
      .dropdown-content
        a.dropdown-item(v-for='item in items'
                        @click='choose(item)'
                        :class='{ "is-active": item === value }')
          | {{ item.name }}
</template>

<script>

import ObjectChooser from './mixins/ObjectChooser'

export default {

  mixins: [ObjectChooser],

  computed: {
    items() {
      return this.$store.state.facade.reservationtypes
    },
    selectedItemName() {
      return this.value.name
    }
  }

}
</script>

<style lang="scss" scoped>

  .button {
    justify-content: flex-start;
  }

  .dropdown-text {
    align-self: stretch;
    flex-grow: 1;
    text-align: left;
  }

  .dropdown-content {
    max-height: 50vh;
    min-height: 2em;
    overflow-y: scroll;
  }

</style>
