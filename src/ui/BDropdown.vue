<template lang="pug">
  .dropdown(:class="{'is-active': open, 'is-right': isRight}")
    .dropdown-trigger
      button.button.is-fullwidth(@click="toggle")
        span.dropdown-text(v-if="label")
          | {{ label }}
        span.icon.is-small
          fa-icon(icon="fa-angle-down(aria-hidden='true')")
    .dropdown-menu(role='menu')
      .dropdown-content
        slot
</template>

<script>
export default {

  name: 'BDropdown',

  data() {
    return {
      open: false
    }
  },

  props: {
    label: {
      type: String,
      default: ''
    },
    isRight: {
      type: Boolean,
      default: false
    },
    blockStyle: {
      type: Boolean,
      default: false
    }
  },

  created() {
    document.addEventListener('click', this.clickedOutside)
  },

  methods: {
    toggle() {
      if (this.open) {
        this.open = false
      } else {
        this.$nextTick(() => {
          this.open = !this.open
        })
      }
    },

    clickedOutside() {
      this.open = false
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickedOutside)
  }
}
</script>