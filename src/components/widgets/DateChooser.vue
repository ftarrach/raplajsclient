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

import moment from 'moment'

export default {

  props: {
    value: {
      type: Object // moment js date
    },
    title: {
      type: String
    },
    step: {
      type: String,
      default: 'week'
    },
    isEnd: {
      type: Boolean,
      default: () => false
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
    }
  },

  methods: {
    today() {
      if (this.isEnd) {
        this.val = moment().endOf('day')
      } else {
        this.val = moment().startOf('day')
      }
    },
    next() {
      switch (this.step) {
        case 'week':
          this.val = this.val.clone().add(7, 'days')
          break
        case 'day':
          this.val = this.val.clone().add(1, 'days')
          break
      }
    },
    previous() {
      switch (this.step) {
        case 'week':
          this.val = this.val.clone().subtract(7, 'days')
          break
        case 'day':
          this.val = this.val.clone().subtract(1, 'days')
          break
      }
    }
  }
}
</script>
