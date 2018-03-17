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
      return this.id ? this.$store.state.reservationform.appointments.find(a => a.id === this.id) : false
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
        let startdate = DateTime.clone(this.end)
        startdate.hours = parseInt(newVal.split(':')[0])
        startdate.minutes = parseInt(newVal.split(':')[1])
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'end',
          value: startdate
        })
      }
    },

    interval: {
      get() {
        return this.appointment.repeating.interval
      },
      set(newVal) {
        this.$store.commit('reservationform/updateInterval', {
          id: this.id,
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
        // this.appointment.end = DateTime.fromMoment(newVal)
      }
    },

    endtimetype: {
      get() {
        return 'same-day'
        // return this.appointment.time ? this.appointment.time.endtype : ''
      },
      set(newVal) {
        // this.appointment.time.endtype = newVal
      }
    },

    endtype: {
      get() {
        // return this.appointment.enddatetype
        if (this.appointment.maxEnd === null) {
          return 'infinity'
        }
      },
      set(newVal) {
        // this.appointment.enddatetype = newVal
      }
    },

    times: {
      get() {
        // if (this.appointment.repeat.times < 1) {
        //   this.xDay = 1
        // }
        // return this.appointment.repeat.times
        return this.appointment.number
      },
      set(newVal) {
        this.$store.commit('reservationform/updateAppointmentValue', {
          id: this.id,
          prop: 'number',
          value: newVal
        })
      }
    },

    xDay: {
      get() {
        return this.appointment.number
      },
      set(newVal) {
        // if (this.appointment.time) {
        //   this.appointment.time.xday = newVal
        // }
      }
    },

    weekdays: {
      get() {
        return this.appointment.repeating.weekdays
      },
      set(newVal) {
        // TODO
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
