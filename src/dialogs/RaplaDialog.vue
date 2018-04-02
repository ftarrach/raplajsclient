<template lang="pug">
  .modal(:class="{'is-active': open}")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title {{ title }}
        button.delete(@click="requestClose")
      section.modal-card-body
        fa-icon(v-if="faIcon" :icon="faIcon")
        rapla-dialog-dynamic(ref="dyn")
      footer.modal-card-foot
        button.button(v-for="(button, index) in buttons"
                      @click="selected(index)")
          | {{ button }}
</template>

<script>

import RaplaDialogDynamic from './RaplaDialogDynamic'

export default {
  name: 'rapla-dialog',

  components: {
    RaplaDialogDynamic
  },

  data() {
    return {
      open: false,
      title: '',
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
      // this.$refs.content.appendChild(createDynamic(root).$el)
      this.$refs.dyn.initialize(vueDialog.getContent())
      this.buttons = vueDialog.getButtonStrings()
      this.$options.gwtPromise = vueDialog.getPromise()
      this.open = true
    },

    requestClose() {
      this.selected(-1)
    },

    closeDialog() {
      this.open = false
    },

    selected(index) {
      this.closeDialog()
      this.$options.gwtPromise.complete(api.toInteger(index))
    }
  }

}
</script>
