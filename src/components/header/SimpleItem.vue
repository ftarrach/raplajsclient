<template lang="pug">
  router-link.navbar-item(:to='{ name: route }'
                          active-class="is-active")
    slot
</template>

<script>
export default {
  props: {
    route: {
      required: true
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .is-active {
    background: #e0e0e0 !important
  }
</style>
