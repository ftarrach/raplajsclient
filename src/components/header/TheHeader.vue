<template lang="pug">
nav.navbar.is-fixed-top(ref='navbar')
  .shadow
  .container
    header-base(@burgerClick='toggleBurgerMenu')
    .navbar-menu(:class='{ "is-active": sidemenuOpen }')
      .navbar-start
        simple-item(route="Calendar")
          | {{ "reservations" | gwt-localize }}
        simple-item(route="Resources")
          | {{ "resources" | gwt-localize }}
      .navbar-end
        .navbar-item.login {{ login }}
</template>

<script>
import HeaderBase from './HeaderBase'
import SimpleItem from './SimpleItem'

export default {
  components: {
    HeaderBase,
    SimpleItem
  },

  data() {
    return {
      sidemenuOpen: false
    }
  },

  computed: {
    login() {
      return this.$store.getters['calendar/username']
    }
  },

  methods: {
    toggleBurgerMenu() {
      this.sidemenuOpen = !this.sidemenuOpen
    }
  }
}
</script>

<style scoped>

  .mainimage {
    width: 28px;
    height: 28px;
  }

  .login {
    color: red;
  }

  .shadow {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), transparent);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 8px;
  }
</style>
