<template lang="pug">
  v-dialog(v-model="open" persistent max-width="780px")
    v-card
      v-card-title.headline Fehler
      v-card-text.red--text {{ text }}
      v-card-actions
        v-layout(justify-end)
          v-btn(color="primary" flat @click.stop="closeDialog") OK
</template>

<script>
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

  beforeDestroy() {
    this.$root.$off('open-error-dialog', this.openDialog)
  },

  methods: {
    openDialog(e) {
      console.error('opening error dialog:')
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
