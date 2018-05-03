<template lang="pug">
  v-card
    v-card-title(primary-title)
      h3 &nbsp;
    v-flex
      v-tabs(grow v-model="selected")
        v-tab(ripple) {{ 'no_repeating' | localize }}
        v-tab(ripple) {{ 'weekly' | localize }}
        v-tab(ripple) {{ 'daily' | localize }}
        v-tab(ripple) {{ 'monthly' | localize }}
        v-tab(ripple) {{ 'yearly' | localize }}
        v-tab-item
          //- no repeating
        v-tab-item
          appointment-detail-weekly(
            :appointment="appointment"
          )
        v-tab-item
          //- daily
        v-tab-item
          //- monthly
        v-tab-item
          //- yearly
</template>

<script>
import AppointmentDetailWeekly from './AppointmentDetailWeekly'

export default {
  components: {
    AppointmentDetailWeekly
  },

  props: {
    appointment: {
      type: Object
    }
  },

  data() {
    return {
      selected: '1'
    }
  },

  created() {
    if (this.appointment.repeating === null) {
      this.selected = 0
    }
  },

  computed: {
    repeatingType() {
      switch (this.selected) {
        case '1':
          return 'no-repeat'
        case '2':
          return 'weekly'
        case '3':
          return 'daily'
        case '4':
          return 'monthly'
        case '5':
          return 'yearly'
      }
    }
  }
}
</script>
