<template lang="pug">
  .navbar-brand
    router-link.navbar-item(:to='{ name: "Index" }')
      img(src='../../assets/icon/rapla_32x32.png', class='mainimage')
    #navbarBurger.navbar-burger.burger(:class='{"is-active": sidemenuOpen}' @click='burgerClick')
      span
      span
      span
</template>

<script>
export default {
  data() {
    return {
      sidemenuOpen: false
    }
  },
  methods: {
    burgerClick() {
      this.$emit('burgerClick')
      this.sidemenuOpen = !this.sidemenuOpen
    }
  }
}
</script>

<style>

</style>
