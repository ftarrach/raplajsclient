<template lang="pug">
  v-form(v-model="appointment.valid")
    v-container.px-3(grid-list-md)
      v-layout(column)
        v-layout(row justify-end)
          v-flex(xs12 sm3)
              v-btn(block flat)
                | {{ "appointment.convert" | localize }}
          v-flex(xs12 sm3)
            v-btn(block flat color="red")
              | {{ "appointment.exceptions" | localize }}
        v-layout(row wrap)
          v-flex(xs4 sm2)
            v-subheader {{ "repeating.interval.pre" | localize }}
          v-flex(xs8 sm3)
            v-text-field(
              v-model="appointment.repeating.interval"
              :rules="rules.positiveNumber"
            )
          v-flex(xs1)
            v-checkbox(
              label="Mo"
              v-model="appointment.repeating.weekdays"
              value="1"
            )
          v-flex(xs1)
            v-checkbox(
              label="Di"
              v-model="appointment.repeating.weekdays"
              value="2"
            )
          v-flex(xs1)
            v-checkbox(
              label="Mi"
              v-model="appointment.repeating.weekdays"
              value="3"
            )
          v-flex(xs1)
            v-checkbox(
              label="Do"
              v-model="appointment.repeating.weekdays"
              value="4"
            )
          v-flex(xs1)
            v-checkbox(
              label="Fr"
              v-model="appointment.repeating.weekdays"
              value="5"
            )
          v-flex(xs1)
            v-checkbox(
              label="Sa"
              v-model="appointment.repeating.weekdays"
              value="6"
            )
          v-flex(xs1)
            v-checkbox(
              label="So"
              v-model="appointment.repeating.weekdays"
              value="7"
            )
        v-layout
          v-flex(xs6)
            dialog-time-picker(
              :label="'start_time' | localize"
              :disabled="appointment.allDay"
              v-model="appointment.start.time"
            )
          v-flex(xs6)
            v-checkbox(
              :label="'all-day' | localize"
              v-model="appointment.end.time"
            )
        v-layout(row)
          v-flex(xs6)
            dialog-time-picker(
              :label="'end_time' | localize"
              :disabled="appointment.isWholeDay"
              v-model="appointment.end.time"
            )
          v-flex(xs6)
            v-select(
              :items="endtimeTypeItems"
              :disabled="appointment.allDay"
              v-model="endtimeType"
            )
        v-layout(row)
          v-flex(xs6)
            dialog-date-picker(
              :label="lblStartDate"
              v-model="appointment.start.date"
            )
        v-layout(row)
          v-flex(xs6)
            v-select(
              v-model="repeatEndtype"
              :items="repeatEndtypeItems"
            )
          v-flex(xs6)
            v-text-field(
              v-model="appointment.repeating.number"
              :rules="rules.positiveNumber"
              v-show="repeatEndtype === 'n-times'"
            )
            dialog-date-picker(
              v-if="appointment.repeating.end"
              v-model="appointment.repeating.end.date"
              v-show="repeatEndtype === 'end-date'"
            )
</template>

<script>
// TODO: Diese Component manipuliert bisher direkt die Werte des Appointment-Objekts.
// Es nimmt noch keine GWT Objekte entgegen und manipuliert diese auch nicht.
// Die Beste Lösung wäre es, in dieser Komponente nur Events abzufeuern und die Änderungen in
// der ReservationForm vorzunehmen, wo bisher auch schon die Classifications gesetzt werden.
import DialogDatePicker from '@/ui//DialogDatePicker'
import DialogTimePicker from '@/ui//DialogTimePicker'
import { addDays, getRepeatEndtype } from './util'
import Appointment from '@/types/Appointment'
import Locale from '@/locale'

export default {
  components: {
    DialogDatePicker,
    DialogTimePicker
  },

  props: {
    appointment: {
      type: Appointment
    }
  },

  data() {
    return {
      valid: false,

      rules: {
        positiveNumber: [
          v => !!v || 'Number required',
          v => !isNaN(v) || 'Invalid input',
          v => v > 0 || 'Number must be positive'
        ]
      },

      repeatTypeItems: [],
      endtimeTypeItems: []
    }
  },

  computed: {
    endtimeType() {
      if (this.appointment.start.date === this.appointment.end.date) {
        return 'same-day'
      } else if (
        addDays(this.appointment.start.date, 1) === this.appointment.end.date
      ) {
        return 'next-day'
      }
      return 'x-day'
    },
    repeatEndtype: {
      get() {
        return getRepeatEndtype(this.appointment)
      },
      set(newVal) {
        alert('implement me')
      }
    },

    lblStartDate() {
      return `${this.localize('weekly')} ${this.localize(
        'repeating.start_date'
      )}`
    }
  },

  created() {
    this.endtimeTypeItems = [
      { text: this.localize('appointment.same_day'), value: 'same-day' },
      { text: this.localize('appointment.next_day'), value: 'next-day' },
      { text: this.localize('appointment.day_x'), value: 'x-day' }
    ]
    this.repeatEndtypeItems = [
      { text: this.localize('repeating.end_date'), value: 'end-date' },
      { text: this.localize('repeating.n_times'), value: 'n-times' },
      { text: this.localize('repeating.forever'), value: 'forever' }
    ]
  },

  methods: {
    localize(value) {
      return Locale.localize(value)
    }
  }
}
</script>
