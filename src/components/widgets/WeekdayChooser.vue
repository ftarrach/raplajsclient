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

export default {

  data() {
    return {
      items: []
    }
  },

  created() {
    this.items = [
      {value: 1, label: this.$rapla.locale.formatWeekday(1, 'short')}, // TODO: use locale
      {value: 2, label: this.$rapla.locale.formatWeekday(2, 'short')},
      {value: 3, label: this.$rapla.locale.formatWeekday(3, 'short')},
      {value: 4, label: this.$rapla.locale.formatWeekday(4, 'short')},
      {value: 5, label: this.$rapla.locale.formatWeekday(5, 'short')},
      {value: 6, label: this.$rapla.locale.formatWeekday(6, 'short')},
      {value: 7, label: this.$rapla.locale.formatWeekday(7, 'short')}
    ]
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
