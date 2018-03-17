<template lang="pug">
  b-drilldown(:items="resources" :value="selectedResources")
    b-drilldown-container(slot="node"
                          slot-scope="{ item, selected }"
                          :item="item"
                          :selected="selected",
                          :values="selectedResources")
    resource-list-item(slot="leaf"
                       slot-scope="{ item, selected }"
                       :item="item"
                       :selected="selected")
</template>

<script>

import ResourceListItem from './ResourceListItem'
import { sortByName } from '@/types/Nameable'

export default {

  components: {
    ResourceListItem
  },

  props: {
    appointmentId: {
      type: [String, Number, Boolean]
    }
  },

  computed: {
    resources() {
      return this.$store.getters['facade/allResourcetypes'].sort(sortByName).map(type => {
        return [
          {
            id: type.id,
            label: type.name,
            children: this.$store.getters['facade/allocatablesForType'](type.id).sort(sortByName).map(a => ({ id: a.id, label: a.name }))
          }
        ]
      }).reduce((acc, arr) => { acc.push(...arr); return acc }, [])
    },

    selectedResources: {
      get() {
        let app = this.$store.getters['reservationform/appointment'](this.appointmentId)
        if (app) {
          return app.allocatables
        } else {
          return []
        }
      },
      set(newVal) {
        console.log(newVal)
      }
    }
  }
}
</script>

<style scoped>

  .reservation-list-grid {
    width: 100%;
    height: 20em;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid #dbdbdb;
    border-top: 0;
    border-radius: 3px;
  }

  .small-padding {
    padding: 0.5em;
  }
</style>
