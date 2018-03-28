<template lang="pug">
  #app
    the-header
    router-view.maincontent
    rapla-dialog
    error-dialog
</template>

<script>

import TheHeader from './components/header/TheHeader'
import RaplaDialog from './dialogs/RaplaDialog'
import ErrorDialog from './dialogs/ErrorDialog'

export default {
  components: {
    TheHeader,
    RaplaDialog,
    ErrorDialog
  },

  created() {
    this.loadCalendars()
    this.initCalendar(null)
  },

  methods: {
    loadCalendars() {
      this.$store.dispatch('common/loadCalendars')
    },

    initCalendar(key) {
      this.$store.dispatch('calendar/loadCalendar', key)
      this.$store.dispatch('facade/initialize')
    }
  }
}
</script>

<style lang="scss">

  @import './assets/sass/bulma.scss';

  .maincontent {
    position: relative;
    top: 52px;
  }

  .columns.is-gridline {
    margin-bottom: 0 !important;
  }

  .r-fullwidth {
    width: 100%
  }

  /* hides number spinners in chrome */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  /* hides number spinners in firefox */
  input[type=number] { -moz-appearance:textfield }
</style>
