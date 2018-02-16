import Chooser from './Chooser'

export default {

  mixins: [Chooser],

  props: {
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    selectedItemName() {
      let selected = this.items.filter(i => i.value === this.value)
      if (selected.length > 0) {
        return selected[0].label
      }
      return ''
    }
  }
}
