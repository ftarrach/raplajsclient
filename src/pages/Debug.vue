<template lang="pug">
  pre.pre {{ content }}
</template>

<script>
export default {
  data() {
    return {
      content: {}
    }
  },
  created() {
    window.debug = (txt) => {
      this.content = txt
    }
    window.store = this.$store
  }
}
</script>

<style>
  .pre {
    height: 90vh
  }
</style>
