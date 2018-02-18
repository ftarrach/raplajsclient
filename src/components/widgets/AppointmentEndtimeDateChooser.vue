<template lang="pug">
  .dropdown(:class='{ "is-active": open }')
    .dropdown-trigger
      button.button.is-fullwidth(@click='toggleMenu')
        span.dropdown-text {{ selectedItemName }}
        span.icon.is-small
          i.fa.fa-angle-down
    .dropdown-menu(role='menu')
      .dropdown-content
        a.dropdown-item(v-for='item in items'
                        @click='choose(item)'
                        :class='{ "is-active": item === value }')
          | {{ item.label }}
</template>

<script>

import StringChooser from './mixins/StringChooser'

export default {

  mixins: [StringChooser],

  data() {
    return {
      open: false,
      items: []
    }
  },

  created() {
    this.items = [
      { value: 'until', label: this.$rapla.locale.localize('repeating.end_date') },
      { value: 'x-times', label: this.$rapla.locale.localize('repeating.n_times') },
      { value: 'infinity', label: this.$rapla.locale.localize('repeating.forever') }
    ]
  }

}
</script>
