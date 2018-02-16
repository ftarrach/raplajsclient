<template lang="pug">
  #app
    rapla-header
    router-view.maincontent
    rapla-dialog
</template>

<script>

// TODO: externalize modal component
// THINK: folder gwtComponents for Components which high gwt interactions like modal

import RaplaHeader from './components/header/RaplaHeader'
import RaplaDialog from './gwtcomponents/Dialog'

export default {
  components: {
    RaplaHeader,
    RaplaDialog
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
</style>
