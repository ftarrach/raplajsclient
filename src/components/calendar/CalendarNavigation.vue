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
          label: this.$rapla.locale.localize('reservations')
        },
        {
          route: 'CalendarAppointment',
          label: this.$rapla.locale.localize('appointments')
        },
        {
          route: 'CalendarDay',
          label: this.$rapla.locale.localize('day')
        },
        {
          route: 'CalendarDayResource',
          label: this.$rapla.locale.localize('day_resource')
        },
        {
          route: 'Calendar',
          label: this.$rapla.locale.localize('week')
        },
        {
          route: 'CalendarWeekResource',
          label: this.$rapla.locale.localize('week_compact')
        },
        {
          route: 'CalendarWeekProgram',
          label: this.$rapla.locale.localize('week_timeslot')
        },
        {
          route: 'CalendarDayProgram',
          label: this.$rapla.locale.localize('day_timeslot')
        },
        {
          route: 'CalendarMonth',
          label: this.$rapla.locale.localize('month')
        }
      ]
    }
  }
}
</script>
