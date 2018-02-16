<template lang="pug">
  .container.period-and-calendar-chooser
    .columns
      .column.is-third
        calendar-chooser(:resources='resources'
                         :types='resourcetypes'
                         title='Kalender'
                         v-model='resource')
      .column.is-third
        date-chooser(v-model='from'
                     title='Start')
      .column.is-third
        date-chooser(v-model='to'
                     title='Ende')
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
