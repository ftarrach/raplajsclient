<template lang="pug">
  .field
    label.label {{ title }}
    .field.has-addons
      .control.is-expanded
        b-datepicker(v-model='val')
      .control
        button.button(@click='today') {{ "today" | gwt-localize }}
      .control
        button.button.is-hidden-mobile(@click='previous')
          i.fa.fa-caret-left
      .control
        button.button.is-hidden-mobile(@click='next')
          i.fa.fa-caret-right
</template>

<script>

import DateTime from '@/types/util/DateTime'
import moment from 'moment'

export default {

  props: {
    value: {
      type: DateTime
    },
    title: {
      type: String
    },
    step: {
      type: String,
      default: 'week'
    }
  },

  computed: {
    /* proxy property, because v-model can't be nested */
    val: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    moment() {
      return DateTime.toMoment(this.value)
    }
  },

  methods: {
    today() {
      this.val = DateTime.fromMoment(moment().startOf('day'))
    },
    next() {
      switch (this.step) {
        case 'week':
          this.val = DateTime.fromMoment(this.moment.add(7, 'days'))
          break
        case 'day':
          this.val = DateTime.fromMoment(this.moment.add(1, 'days'))
          break
      }
    },
    previous() {
      switch (this.step) {
        case 'week':
          this.val = DateTime.fromMoment(this.moment.add(7, 'days'))
          break
        case 'day':
          this.val = DateTime.fromMoment(this.moment.add(1, 'days'))
          break
      }
    }
  }
}
</script>
