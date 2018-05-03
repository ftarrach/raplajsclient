<template lang="pug">
  .day-header(:style="{flexGrow: width}")
    h3.primary--text {{ day | weekday }}
    h2.primary--text {{ day | day }}
</template>

<script>
import Locale from '@/locale'
import DateTime from '@/types/DateTime'

export default {
  props: {
    day: {
      type: DateTime,
      required: true
    },

    width: {
      type: Number,
      required: false,
      default: () => 1
    }
  },

  filters: {
    weekday(value) {
      return Locale.formatWeekdayDate(value)
    },

    day(value) {
      return value.dateObject().day
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './variables'

h2
  font-size 2.5em
  line-height 1em
  font-weight normal
  padding-left 0.1em

h3
  font-size 1em
  line-height 2.25em
  font-weight normal
  padding-left 0.25em

.day-header
  border-bottom $border
  border-right $border
  flex 1 1 0%

</style>
