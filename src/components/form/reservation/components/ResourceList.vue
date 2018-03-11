<template lang="pug">
  b-drilldown(:items="resources")
    b-drilldown-container(slot="node"
                          slot-scope="{ item, selected }"
                          :item="item"
                          :selected="selected")
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

  data() {
    return {

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
    }
  },

  created() {
  },

  methods: {
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
