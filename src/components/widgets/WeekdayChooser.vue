<template lang="pug">
  .columns.is-gapless.is-mobile.is-multiline
    .column.is-one-third-mobile.is-one-quater-tablet(v-for="(item, index) in items" :key="item.value")
      b-toggle-button(@click="choose"
                      :value="item.value"
                      :label="item.label"
                      :selected="value.includes(item.value)"
                      radiusless
                      fullwidth)
</template>

<script>

import moment from 'moment'

export default {

  data() {
    return {
      items: [
        {value: 0, label: moment().weekday(0).format('dd')}, // TODO: use locale
        {value: 1, label: moment().weekday(1).format('dd')},
        {value: 2, label: moment().weekday(2).format('dd')},
        {value: 3, label: moment().weekday(3).format('dd')},
        {value: 4, label: moment().weekday(4).format('dd')},
        {value: 5, label: moment().weekday(5).format('dd')},
        {value: 6, label: moment().weekday(6).format('dd')}
      ]
    }
  },

  props: {
    value: {
      type: Array, // [Number]
      required: true
    }
  },

  methods: {
    choose(event) {
      if (event.selected) {
        let newVal = this.value.slice(0) // copy the array
        newVal.push(event.value)
        newVal.sort()
        this.$emit('input', newVal)
      } else {
        this.$emit('input', this.value.filter(item => item !== event.value))
      }
    }
  }

}
</script>
