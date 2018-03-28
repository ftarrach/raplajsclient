<template lang="pug">
  .modal(:class="{'is-active': open}")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title {{ "error" | gwt-localize }}
        button.delete(@click="closeDialog")
      section.modal-card-body
        nl2br(tag="p" :text="text")
      footer.modal-card-foot
        button.button(@click="closeDialog")
          | {{ "close" | gwt-localize }}
</template>

<script>
// TODO: this is a TextDialog. Name it accordingly
export default {

  data() {
    return {
      open: false,
      text: ''
    }
  },

  created() {
    this.$root.$on('open-error-dialog', this.openDialog)
  },

  methods: {
    openDialog(e) {
      console.error('opening error dialog with:')
      console.error(e)
      if (e.backingJsObject) {
        this.text = `${e.backingJsObject.message}\n\n${e.backingJsObject.stack}`
      } else {
        this.text = e.message
      }
      this.open = true
    },

    closeDialog() {
      this.open = false
    }
  }

}
</script>
