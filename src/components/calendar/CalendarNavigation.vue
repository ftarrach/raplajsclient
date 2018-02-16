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
          label: this.$rapla.localize('reservations')
        },
        {
          route: 'CalendarAppointment',
          label: this.$rapla.localize('appointments')
        },
        {
          route: 'CalendarDay',
          label: this.$rapla.localize('day')
        },
        {
          route: 'CalendarDayResource',
          label: this.$rapla.localize('day_resource')
        },
        {
          route: 'Calendar',
          label: this.$rapla.localize('week')
        },
        {
          route: 'CalendarWeekResource',
          label: this.$rapla.localize('week_compact')
        },
        {
          route: 'CalendarWeekProgram',
          label: this.$rapla.localize('week_timeslot')
        },
        {
          route: 'CalendarDayProgram',
          label: this.$rapla.localize('day_timeslot')
        },
        {
          route: 'CalendarMonth',
          label: this.$rapla.localize('month')
        }
      ]
    }
  }
}
</script>
