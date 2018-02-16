<template lang="pug">
nav.navbar.is-fixed-top(ref='navbar')
  .shadow
  .container
    header-base(@burgerClick='toggleBurgerMenu')
    .navbar-menu(:class='{ "is-active": sidemenuOpen }')
      .navbar-start
        simple-item(route="Calendar")
          | {{ "reservations" | r-localize }}
        simple-item(route="Resources")
          | {{ "resources" | r-localize }}
      .navbar-end
        .navbar-item.login {{ login }}
</template>

<script>
import HeaderBase from './HeaderBase'
import SimpleItem from './SimpleItem'
import DropdownItem from './DropdownItem'

export default {
  components: {
    HeaderBase,
    SimpleItem,
    DropdownItem
  },
  mounted() {

  },
  data() {
    return {
      sidemenuOpen: false,
      items: [
        {
          label: 'Reservierungen',
          route: 'Calendar'
        },
        {
          label: 'Ressourcen',
          route: 'Resources'
        }
      ],
      login: 'fabian'
    }
  },
  methods: {
    toggleBurgerMenu(event) {
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
