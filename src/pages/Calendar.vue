<template lang="pug">
  section
    calendar-navigation
    article
      router-view
</template>

<script>
import CalendarNavigation from '@/components/calendar/CalendarNavigation'

export default {
  components: {
    CalendarNavigation
  },
  data() {
    return {

    }
  }
}
</script>