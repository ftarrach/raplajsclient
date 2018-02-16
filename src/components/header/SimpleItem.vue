<template lang="pug">
  router-link.navbar-item(:to='{ name: item.route }'
                          active-class="is-active")
    | {{ item.label }}
</template>

<script>
export default {
  props: {
    item: {
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
