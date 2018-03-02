<template lang="pug">
  input(class='input' type='text' :value='value')
</template>

<script>
import Flatpickr from 'flatpickr'
import { German } from 'flatpickr/dist/l10n/de'
import moment from 'moment'

export default {

  name: 'BDatepicker',

  props: {
    config: {
      type: Object,
      default: () => {
        let cfg = {
          locale: German,
          altInput: true,
          altFormat: 'd/m/Y D',
          // desktop browsers don't support native datechoosers yet, so mobile emulation fails.
          disableMobile: process.env.NODE_ENV !== 'production'
        }
        return cfg
      }
    },
    value: {
      type: Object // a moment.js date object
    }
  },

  data() {
    return {
      datepicker: null, // Flatpickr object
      moment: null // selected date moment js object
    }
  },

  methods: {
    redraw(newConfig) {
      this.datepicker.config = Object.assign(this.datepicker.config, newConfig)
      this.datepicker.redraw()
      this.datepicker.jumpToDate()
    },
    setDate(newDate) {
      this.datepicker.setDate(newDate)
    },
    /* called when user chooses a date */
    onDateUpdate(selectedDate) {
      this.moment = moment(selectedDate)
      this.$emit('input', this.moment)
    }
  },

  mounted() {
    this.$watch('config', this.redraw)
    this.$watch('value', (value) => this.setDate(value.toDate()))
    this.config.onValueUpdate = (selectedDate, _) => this.onDateUpdate(selectedDate[0])
    this.datepicker = new Flatpickr(this.$el, this.config)
    if (!this.value) {
      // this.onDateUpdate(moment().toDate())
    } else {
      this.setDate(this.value.toDate())
      this.moment = this.value
    }
  },

  beforeDestroy() {
    let isStatic = !!this.config.static
    if (this.datepicker && !isStatic) {
      this.datepicker.destroy()
      this.datepicker = null
    }
  }
}
</script>

<style lang='scss'>
  // TODO: replace with bulma calendar: https://wikiki.github.io/components/calendar/

  @import 'flatpickr/dist/flatpickr.min.css';

  .flatpickr-wrapper {
    width: 100%;
  }

  .flatpickr-calendar.hasWeeks {
    width: auto !important;
  }

  .input.flatpickr-input {
    cursor: pointer;
  }
</style>
