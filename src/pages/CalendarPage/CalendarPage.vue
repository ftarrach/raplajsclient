<template lang="pug">
  .calendar-page
    calendar-view(
      :days="days",
      :appointments="appointments"
      :legendlabel="legendlabel"
      @block-click="onBlockClick"
    )
</template>

<script>
import CalendarView from '@/components/CalendarView/CalendarView'
import demodata from './demodata'
import Locale from '@/locale'
import DialogDatePicker from '@/ui//DialogDatePicker'
import DateTime from '@/types/DateTime'

export default {
  components: {
    CalendarView,
    DialogDatePicker
  },

  props: {
    viewId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      days: [],
      appointments: [],
      start: null,
      end: null
    }
  },

  computed: {
    legendlabel() {
      return Locale.format('calendarweek.abbreviation', '0')
    }
  },

  created() {
    this.days = demodata.days
    this.appointments = demodata.appointments
    this.start = new DateTime('2018-01-01')
    this.end = new DateTime('2018-01-05')
  },

  methods: {
    onBlockClick(id) {
      alert(`clicked on block with id ${id}`)
    }
  }
}
</script>

