<template lang="pug">
  div
    .columns
      .column.is-1
        span {{ "repeating.interval.pre" | gwt-localize }}
      .column.is-3
        b-spinner(min="1"
                  v-model="interval")
      .column.is-1
        span {{ "day" | gwt-localize }}
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
        span {{ "daily" | gwt-localize }} {{ "repeating.start_date" | gwt-localize }}
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
export default {

}
</script>
