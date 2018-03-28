<template lang="pug">
  .day-header
    h2
      .weekday {{ weekday }}
      .date {{ day }}
</template>

<script>

import DateTime from '@/types/util/DateTime'

export default {
  props: {
    date: {
      required: true,
      type: DateTime
    }
  },
  data() {
    return {

    }
  },
  computed: {
    weekday() {
      return DateTime.toMoment(this.date).format('dd')
    },
    day() {
      return DateTime.toMoment(this.date).format('DD')
    }
  }
}
</script>

<style lang='scss'>
.day-header {
  border: #e0e0e0 solid 1px;
  color: #4285f4;
  padding: 0.5em;
  padding-left: 1em;

  .weekday {
    font-size: 0.75em;
  }

  .date {
    font-size: 2.5em;
    font-weight: 400;
    line-height: 1em;
  }
}
</style>
