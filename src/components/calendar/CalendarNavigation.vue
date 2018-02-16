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
  data() {
    return {
      elements: [
        {
          route: 'CalendarEvent',
          label: 'Veranstaltungen'
        },
        {
          route: 'CalendarAppointment',
          label: 'Termine'
        },
        {
          route: 'CalendarDay',
          label: 'Tag'
        },
        {
          route: 'CalendarDayResource',
          label: 'Tag/Ressource'
        },
        {
          route: 'Calendar',
          label: 'Woche'
        },
        {
          route: 'CalendarWeekResource',
          label: 'Woche/Ressource'
        },
        {
          route: 'CalendarWeekProgram',
          label: 'Wochenprogramm'
        },
        {
          route: 'CalendarDayProgram',
          label: 'Tagesprogramm'
        },
        {
          route: 'CalendarMonth',
          label: 'Monat'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
