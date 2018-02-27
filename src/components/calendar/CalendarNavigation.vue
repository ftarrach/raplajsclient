<template lang="pug">
  section.hero.is-link.calendar-navigation
    nav.tabs.is-fullwidth.hero.is-link.is-boxed
      .container
        ul
          li(v-for='element in elements') 
            router-link.navbar-item.is-tab(:to='{ name: element.route }'
                                           active-class="is-active"
                                           exact)
              | {{ element.label }}
</template>

<script>
export default {
  computed: {
    elements() {
      return [
        {
          route: 'CalendarEvent',
          label: this.$store.getters['locale/localize']('reservations')
        },
        {
          route: 'CalendarAppointment',
          label: this.$store.getters['locale/localize']('appointments')
        },
        {
          route: 'CalendarDay',
          label: this.$store.getters['locale/localize']('day')
        },
        {
          route: 'CalendarDayResource',
          label: this.$store.getters['locale/localize']('day_resource')
        },
        {
          route: 'Calendar',
          label: this.$store.getters['locale/localize']('week')
        },
        {
          route: 'CalendarWeekResource',
          label: this.$store.getters['locale/localize']('week_compact')
        },
        {
          route: 'CalendarWeekProgram',
          label: this.$store.getters['locale/localize']('week_timeslot')
        },
        {
          route: 'CalendarDayProgram',
          label: this.$store.getters['locale/localize']('day_timeslot')
        },
        {
          route: 'CalendarMonth',
          label: this.$store.getters['locale/localize']('month')
        }
      ]
    }
  }
}
</script>
