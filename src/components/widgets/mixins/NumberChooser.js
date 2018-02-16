export default {

  created() {
    document.addEventListener('click', this.clickedOutside)
  },

  data() {
    return {
      open: false
    }
  },

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickedOutside)
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
      this.$emit('input', item)
    },

    clickedOutside() {
      this.open = false
    }
  }
}
