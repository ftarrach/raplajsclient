<template lang="pug">
  component(:is="view" :view-id="viewId")
</template>

<script>
import TableView from './TableView/TableView'
import CalendarPage from './CalendarPage/CalendarPage'
import StandaloneView from './StandaloneView'

export default {
  components: {
    TableView
  },

  props: {
    viewId: {
      type: String,
      required: true
    }
  },

  computed: {
    view() {
      if (window.api) {
        return this.showView
      } else {
        return this.showStandaloneView
      }
    },

    showView() {
      if (this.viewId.startsWith('table_')) {
        return TableView
      }
      switch (this.viewId) {
        case 'day':
        case 'week':
          return CalendarPage
      }
    },

    showStandaloneView() {
      return StandaloneView
    }
  }
}
</script>
