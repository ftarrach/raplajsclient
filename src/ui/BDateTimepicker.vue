<template lang="pug">
  .field.has-addons
    p.control
      b-datepicker(v-model="date")
    p.control
      b-timepicker(v-model="time")
</template>

<script>

import DateTime from '@/types/util/DateTime'

export default {
  name: 'BDateTimepicker',

  props: {
    value: {
      type: DateTime
    }
  },

  computed: {
    date: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    },

    time: {
      get() {
        let h = this.value.hours
        if (h < 10) {
          h = '0' + h
        }
        let m = this.value.minutes
        if (m < 10) {
          m = '0' + m
        }
        return `${h}:${m}`
      },
      set(newVal) {
        let newDatetime = DateTime.clone(this.value)
        newDatetime.hours = parseInt(newVal.split(':')[0])
        newDatetime.minutes = parseInt(newVal.split(':')[1])
        this.$emit('input', newDatetime)
      }
    }
  }

}
</script>
