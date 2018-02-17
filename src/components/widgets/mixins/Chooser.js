// TODO: remove all mixins, use Vue.extends instead
export default {

  created() {
    document.addEventListener('click', this.clickedOutside)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickedOutside)
  },

  props: {
    disabled: {
      type: Boolean,
      default: () => false
    }
  },

  methods: {
    toggleMenu() {
      if (this.open) {
        this.open = false
      } else {
        this.$nextTick(() => {
          this.open = !this.open
        })
      }
    },

    choose(item) {
      this.open = false
      this.$emit('input', item.value)
    },

    clickedOutside() {
      this.open = false
    }
  }
}
