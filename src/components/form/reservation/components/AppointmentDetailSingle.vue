<template lang="pug">
  div
    .columns.is-multiline
      .column.is-one-third
        p {{ "start_date" | gwt-localize }}
      .column.is-two-thirds
        b-datepicker(v-model="start")
      .column.is-one-third
        p {{ "end_date" | gwt-localize }}
      .column.is-two-thirds
        b-datepicker(v-model="end")
</template>

<script>

import DateTime from '@/types/util/DateTime'
import moment from 'moment'

// TODO: real values
export default {

  data() {
    return {
      start: null,
      end: null
    }
  },

  created() {
    this.start = DateTime.fromMoment(moment())
    this.end = DateTime.fromMoment(moment())
  }

}
</script>
