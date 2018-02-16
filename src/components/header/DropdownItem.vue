<template lang="pug">
  .navbar-item.has-dropdown.is-hoverable(v-if='item.items')
    a.navbar-link {{ item.label }}
    .navbar-dropdown.is-boxed
      router-link.navbar-item(:to='{ name: subitem.route }'
                              v-for='subitem in item.items'
                              :key='subitem.label')
        | {{ subitem.label }}
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

<style>

</style>
