<template lang="pug">
  .dropdown(:class='{ "is-active": open }')
    .dropdown-trigger
      button.button.is-fullwidth(@click='toggleMenu' :disabled="disabled")
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
        {value: 'same-day', label: 'am selben Tag'},
        {value: 'next-day', label: 'am nächsten Tag'},
        {value: 'x-day', label: 'am Tag x'}
      ]
    }
  }
}
</script>
