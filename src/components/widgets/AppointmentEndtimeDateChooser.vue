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
      items: [
        {value: 'until', label: 'bis zum'},
        {value: 'x-times', label: 'x Mal'},
        {value: 'infinity', label: 'Kein Ende'}
      ]
    }
  }

}
</script>
