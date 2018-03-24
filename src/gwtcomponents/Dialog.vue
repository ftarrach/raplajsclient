<template lang="pug">
  .modal(:class="{'is-active': open}")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title {{ title }}
        button.delete(@click="requestClose")
      section.modal-card-body
        fa-icon(v-if="faIcon" :icon="faIcon")
        span {{ text }}
      footer.modal-card-foot
        button.button(v-for="(button, index) in buttons"
                      @click="selected(index)")
          | {{ button }}
</template>

<script>
// TODO: this is a TextDialog. Name it accordingly
export default {
  name: 'rapla-dialog',

  data() {
    return {
      open: false,
      title: '',
      text: '',
      icon: '',
      buttons: []
    }
  },

  created() {
    this.$root.$on('gwt-dialog-open', this.openDialog)
    this.$root.$on('gwt-dialog-close', this.closeDialog)
  },

  computed: {
    faIcon() {
      switch (this.icon) {
        // TODO: id => font awesome icon here
        default: return null
      }
    }
  },

  methods: {
    openDialog(vueDialog) {
      this.title = vueDialog.getTitle()
      const content = vueDialog.getContent()
      if (content.getDialogType() === 'Text') {
        this.text = content.getWarnings().join('\n')
      }
      this.buttons = vueDialog.getButtonStrings()
      this.$options.gwtPromise = vueDialog.getPromise()
      this.open = true
    },

    requestClose() {
      this.$options.gwtPromise.complete(api.toInteger(-1))
    },

    closeDialog() {
      this.open = false
    },

    selected(index) {
      this.$options.gwtPromise.complete(api.toInteger(index))
    }
  }

}
</script>
