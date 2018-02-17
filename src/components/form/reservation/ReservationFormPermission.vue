<template lang="pug">
  .columns.is-multiline
    .column.is-full
      p.has-text-danger Template only!
    .column.is-half
      label.label {{ "permissions" | gwt-localize }}
      .select.is-multiple.is-flex.is-size-7-mobile
        reservation-form-permission-list(v-model="selectedPermissionId")
</template>

<script>

import ReservationFormPermissionList from './ReservationFormPermissionList'

export default {

  components: {
    ReservationFormPermissionList
  },

  data() {
    return {
      selectedPermissionId: 0
    }
  }
}
</script>
