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
// TODO: this is a TextDialog. Name it accordingly
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
    openDialog(vueDialogInterface) {
      console.log(vueDialogInterface)
      this.title = vueDialogInterface.getTitle()
      const content = vueDialogInterface.getContent()
      console.log(content)
      if (content.getDialogType() === 'Text') {
        this.text = content.getWarnings().join('\n')
      }
      this.$options.gwtPromise = vueDialogInterface.getPromise()
      this.open = true
    },
    closeDialog() {
      // this.$options.gwtPromise.complete(-1)
      this.open = false
    },
    selected(index) {
      this.$options.di.onChoose(index)
    }
  }

}
</script>
