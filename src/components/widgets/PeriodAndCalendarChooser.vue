<template lang="pug">
  .container.period-and-calendar-chooser
    .columns
      .column.is-third
        calendar-chooser(:resources="resources"
                         :types="resourcetypes"
                         :title="calendar"
                         v-model="resource")
      .column.is-third
        date-chooser(v-model="from"
                     :title="fromString")
      .column.is-third
        date-chooser(v-model="to"
                     :title="endString")
</template>

<script>

import DateChooser from '@/components/widgets/DateChooser'
import CalendarChooser from '@/components/widgets/CalendarChooser'

export default {

  components: {
    DateChooser,
    CalendarChooser
  },

  data() {
    return {
      resource: null
    }
  },

  computed: {
    calendar() {
      return this.$rapla.locale.localize('calendar')
    },
    fromString() {
      return this.$rapla.locale.localize('start_date')
    },
    endString() {
      return this.$rapla.locale.localize('end_date')
    },
    resourcetypes() {
      return this.$store.getters.allResourceTypes
    },
    resources() {
      return this.$store.getters.resources
    },
    from: {
      get() {
        return this.$store.state.user.from
      },
      set(value) {
        this.$store.commit('updateFrom', value)
      }
    },
    to: {
      get() {
        return this.$store.state.user.to
      },
      set(value) {
        this.$store.commit('updateTo', value)
      }
    }
  }

}
</script>

<style scoped>
  .period-and-calendar-chooser {
    margin-bottom: 1em;
  }
</style>
