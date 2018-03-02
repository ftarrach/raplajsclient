<template lang="pug">
  .container
    .colmuns
      .column.is-full
        .card
          .card-content
            classification-view
</template>

<script>

import ClassificationView from './components/form/reservation/components/ClassificationView'

export default {

  components: {
    ClassificationView
  }

}
</script>

<style lang="scss">
  @import './assets/sass/bulma.scss';
</style>
