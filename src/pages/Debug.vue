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
    window.debug = function(txt) {
      this.content = txt
    }
  }
}
</script>

<style>
  .pre {
    height: 90vh
  }
</style>
