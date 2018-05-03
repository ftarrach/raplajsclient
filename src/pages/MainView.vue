<template lang="pug">
  component(:is="view" :view-id="viewId")
</template>

<script>

import TableView from './TableView/TableView'
import CalendarPage from './CalendarPage/CalendarPage'

export default {

  components: {
    TableView
  },

  data() {
    return {
      api: null
    }
  },

  props: {
    viewId: {
      type: String,
      required: true
    }
  },

  computed: {
    view() {
      if (this.viewId.startsWith('table_')) {
        return TableView
      }
      switch (this.viewId) {
        case 'day':
        case 'week':
          return CalendarPage
      }
    }
  },

  created() {
    this.api = window.api
  }

}
</script>
