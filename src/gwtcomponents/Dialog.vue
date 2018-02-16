<template lang="pug">
  .modal(:class="{'is-active': open}")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title {{ title }}
        button.delete(@click="closeDialog")
      section.modal-card-body {{ text }}
      footer.modal-card-foot
        button.button(v-for="(button, index) in options"
                      @click="selected(index)")
          | {{ button }}
</template>

<script>
export default {
  name: 'rapla-dialog',

  data() {
    return {
      open: false,
      title: '',
      text: '',
      options: []
    }
  },

  created() {
    this.$root.$on('gwt-dialog-open', this.openDialog)
    this.$root.$on('gwt-dialog-close', this.closeDialog)
  },

  methods: {
    openDialog(params) {
      this.title = params.title
      this.text = params.text
      this.options = params.options
      this.open = true
      this.$options.di = params.di
    },
    closeDialog() {
      this.$options.di.onChoose(-1)
      this.open = false
    },
    selected(index) {
      this.$options.di.onChoose(index)
    }
  }

}
</script>
