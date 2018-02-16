<template lang="pug">
  div
    .columns
      .column.is-2
        span {{ "repeating.interval.pre" | gwt-localize }}
      .column.is-2
        input.input(type="text" v-model.number="value.repeat.interval")
      .column.is-8
        weekday-chooser(v-model="value.days")
    .columns
      .column.is-2
        span {{ "start_time" | gwt-localize }}
      .column.is-3
        input.input(type="text" v-model="startTime" :disabled="wholeDay")
      .column.is-two-fifths
        .b-checkbox.is-primary
          | #[input#whole-day(type="checkbox" v-model="wholeDay").styled] #[label(for="whole-day") ganztägig]
    .columns
      .column.is-2
        span {{ "end_time" | gwt-localize }}
      .column.is-3
        input.input(type="text" v-model="endTime" :disabled="wholeDay")
      .column.is-two-fifth
        appointment-endtime-day-chooser(v-model="endtimetype" :disabled="wholeDay")
      .column.is-two-fifth
        input.input.is-fullwidth(v-show="endtimetype === 'x-day'" v-model="xDay")
    .columns
      .column.is-5
        span {{ "weekly" | gwt-localize }} {{ "repeating.start_date" | gwt-localize }}
      .column
        b-datepicker(v-model="value.begin")
    .columns
      .column.is-one-fifth.is-size-7
        appointment-endtime-date-chooser(v-model="endtype")
      .column.is-two-fifths(v-show="endtype === 'until'")
        b-datepicker(v-model="value.end")
      .column.is-one-fifth(v-show="endtype === 'x-times'")
        input.input(v-model.number="times")
          //- TODO: +- Buttons
</template>

<script>

import WeekdayChooser from '@/components/widgets/WeekdayChooser'
import AppointmentEndtimeDayChooser from '@/components/widgets/AppointmentEndtimeDayChooser'
import AppointmentEndtimeDateChooser from '@/components/widgets/AppointmentEndtimeDateChooser'
import ReservationFormAppointmentDetail from './mixins/ReservationFormAppointmentDetail'

export default {

  mixins: [ReservationFormAppointmentDetail],

  components: {
    WeekdayChooser,
    AppointmentEndtimeDayChooser,
    AppointmentEndtimeDateChooser
  },

  computed: {
    endtimetype: {
      get() {
        return this.value.time ? this.value.time.endtype : ''
      },
      set(newVal) {
        this.value.time.endtype = newVal
      }
    },
    endtype: {
      get() {
        return this.value.enddatetype
      },
      set(newVal) {
        this.value.enddatetype = newVal
      }
    },
    times: {
      get() {
        if (this.value.repeat.times < 1) {
          this.xDay = 1
        }
        return this.value.repeat.times
      },
      set(newVal) {
        this.value.repeat.times = newVal
      }
    },
    xDay: {
      get() {
        return this.value.time ? this.value.time.xday : ''
      },
      set(newVal) {
        if (this.value.time) {
          this.value.time.xday = newVal
        }
      }
    }
  },

  methods: {
    exceptionClick() {
      alert('Exception Button Click')
    }
  },

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      savedTime: null
    }
  }

}
</script>

<style style="scss" scoped>
  .is-size-7 .dropdown-text {
    font-size: 0.75rem !important;
  }
</style>
