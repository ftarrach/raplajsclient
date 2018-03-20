<template lang="pug">
  div
    .columns
      .column.is-1
        span {{ "repeating.interval.pre" | gwt-localize }}
      .column.is-3
        b-spinner(min="1"
                  v-model="interval")
      .column.is-8
        weekday-chooser(v-model="weekdays")
    .columns
      .column.is-2
        span {{ "start_time" | gwt-localize }}
      .column.is-3
        b-timepicker(v-model="startTime" :disabled="wholeDay")
      .column
        .b-checkbox.is-primary
          | #[input#whole-day(type="checkbox" v-model="wholeDay").styled] #[label(for="whole-day") {{ "all-day" | gwt-localize }}]
    .columns
      .column.is-2
        span {{ "end_time" | gwt-localize }}
      .column.is-3
        b-timepicker(v-model="endTime" :disabled="wholeDay")
      .column.is-3
        appointment-endtime-day-chooser(v-model="endtimetype" :disabled="wholeDay")
      .column
        input.input.is-fullwidth(v-show="endtimetype === 'x-day'" v-model="xDay")
    .columns
      .column.is-5
        span {{ "weekly" | gwt-localize }} {{ "repeating.start_date" | gwt-localize }}
      .column
        b-datepicker(v-model="start")
    .columns
      .column.is-3
        appointment-endtime-date-chooser(v-model="endtype")
      .column.is-4(v-show="endtype === 'until'")
        b-datepicker(v-model="end")
      .column.is-4(v-show="endtype === 'x-times'")
        b-spinner(min="1"
                  v-model="times")
        input.input(v-model.number="times")
</template>

<script>

import DateTime from '@/types/util/DateTime'
import WeekdayChooser from '@/components/widgets/WeekdayChooser'
import AppointmentEndtimeDayChooser from '@/components/widgets/AppointmentEndtimeDayChooser'
import AppointmentEndtimeDateChooser from '@/components/widgets/AppointmentEndtimeDateChooser'

export default {

  components: {
    WeekdayChooser,
    AppointmentEndtimeDayChooser,
    AppointmentEndtimeDateChooser
  },

  props: {
    id: {
      type: [String, Boolean],
      required: true
    }
  },

  data() {
    return {
      savedTime: null
    }
  },

  computed: {
    appointment() {
      return this.id ? this.$store.getters['reservationform/appointment'](this.id) : false
    },

    start: {
      get() {
        return this.appointment.start
      },
      set(newVal) {
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'start',
          value: newVal
        })
      }
    },

    startTime: {
      get() {
        return this.$store.getters['locale/formatTime'](this.appointment.start)
      },
      set(newVal) {
        let startdate = DateTime.clone(this.start)
        startdate.hours = parseInt(newVal.split(':')[0])
        startdate.minutes = parseInt(newVal.split(':')[1])
        // TODO: if startdate > enddate, startdate = enddate
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'start',
          value: startdate
        })
      }
    },

    endTime: {
      get() {
        return this.$store.getters['locale/formatTime'](this.appointment.end)
      },
      set(newVal) {
        let enddate = DateTime.clone(this.end)
        enddate.hours = parseInt(newVal.split(':')[0])
        enddate.minutes = parseInt(newVal.split(':')[1])
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'end',
          value: enddate
        })
      }
    },

    interval: {
      get() {
        return this.appointment.repeating.interval
      },
      set(newVal) {
        this.$store.commit('reservationform/updateRepeatingValue', {
          id: this.id,
          prop: 'interval',
          value: newVal
        })
      }
    },

    wholeDay: {
      get() {
        return this.appointment.isWholeDay
      },
      set(newVal) {
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'isWholeDay',
          value: newVal
        })
      }
    },

    end: {
      get() {
        return this.appointment.end
      },
      set(newVal) {
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'end',
          value: newVal
        })
      }
    },

    // TODO: implement it
    endtimetype: {
      get() {
        return 'same-day'
        // same-day: uhrzeit bezieht sich auf selben Tag
        // next-day: uhrzeit bezieht sich auf nächsten Tag
        // x-day: uhrzeit bezieht sich auf nächsten x-ten tag
      },
      set(newVal) {
      }
    },

    // TODO: implement it
    endtype: {
      get() {
        if (this.appointment.maxEnd === null) {
          return 'infinity'
        }
        // until: end on specific date
        // x-times: reservation repeats x times
        // infinity: forever
      },
      set(newVal) {
        // this.appointment.enddatetype = newVal
      }
    },

    // TODO: implement it
    times: {
      get() {
        // if endtype === x-times, this is the input number
      },
      set(newVal) {
        // this.$store.commit('reservationform/updateAppointmentValue', {
        //   id: this.id,
        //   prop: 'number',
        //   value: newVal
        // })
      }
    },

    // TODO: implement it
    xDay: {
      get() {
        // if endtype === x until, this is the date input
      },
      set(newVal) {
        // this.$store.commit('reservationform/updateAppointmentValue', {
        //   id: this.id,
        //   prop: 'number',
        //   value: newVal
        // })
      }
    },

    weekdays: {
      get() {
        return this.appointment.repeating.weekdays
      },
      set(newVal) {
        this.$store.commit('reservationform/updateRepeatingValue', {
          id: this.id,
          prop: 'weekdays',
          value: newVal
        })
      }
    }
  },

  methods: {
    exceptionClick() {
      alert('Exception Button Click')
    }
  }
}
</script>

<style style="scss" scoped>
  .is-size-7 .dropdown-text {
    font-size: 0.75rem !important;
  }
</style>
