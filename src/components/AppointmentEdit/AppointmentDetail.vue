<template lang="pug">
  v-card
    v-card-title(primary-title)
      h3 &nbsp;
    v-layout(wrap)
      v-flex(xs12)
        v-btn-toggle(v-model="selected").repeating-type-toggle
          v-layout(wrap)
            v-btn.xs12.sm6.lg2 {{ 'no_repeating' | localize }}
            v-btn.xs12.sm6.lg2 {{ 'weekly' | localize }}
            v-btn.xs12.sm6.lg2 {{ 'daily' | localize }}
            v-btn.xs12.sm6.lg2 {{ 'monthly' | localize }}
            v-btn.xs12.sm6.lg2 {{ 'yearly' | localize }}
      v-flex(xs12)
        component(:is="component" :appointment="appointment")
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
      selected: 0
    }
  },

  created() {
    if (this.appointment.repeating === null) {
      this.selected = 0
    } else {
      switch (this.appointment.repeating.type) {
        case 'daily':
          this.selected = 2
          break
        case 'weekly':
          this.selected = 1
          break
        case 'monthly':
          this.selected = 3
          break
        case 'yearly':
          this.selected = 4
          break
      }
    }
  },

  computed: {
    component() {
      switch (this.selected) {
        case 0:
          return null
        case 1:
          return AppointmentDetailWeekly
        case 2:
          return null
        case 3:
          return null
        case 4:
          return null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.repeating-type-toggle
  box-shadow none !important
  display flex
  flex-direction row

  .btn
    flex-grow: 1
</style>
