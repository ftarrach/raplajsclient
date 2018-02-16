<template lang="pug">
  .columns.is-multiline.is-marginless
    .column.is-full.is-paddingless
      slot(name="buttons")
    .column.is-full.is-paddingless
      .columns.is-gapless
        .column.is-one-third(v-for="type in resourcetypes" :key="type.id")
          //- TODO: maybe to Dropdown
          b-toggle-button(:label="type.name"
                          :value="type.id"
                          fullwidth
                          @click="id => selectedResourceTypeId = id.value"
                          :selected="type.id === selectedResourceTypeId")
    .column.is-full.is-paddingless
      .reservation-list-grid
        template(v-for="resource in resourcesFromType")
          reservation-form-resources-list-item(:resource="resource"
                                               @click="sendClickEvent")
            slot(name="item-action" :resource="resource")
</template>

<script>

import ReservationFormResourcesListItem from './ReservationFormResourcesListItem'

export default {

  components: {
    ReservationFormResourcesListItem
  },

  props: {
    resources: {
      type: Array // Array of Resources
    }
  },

  data() {
    return {
      selectedResourceTypeId: 0
    }
  },

  computed: {
    resourcetypes() {
      return this.$store.getters.allResourceTypes
    },

    resourcesFromType() {
      return this.resources.filter(r => r.type.id === this.selectedResourceTypeId)
    }
  },

  created() {
    this.selectedResourceTypeId = this.resourcetypes[0].id
  },

  methods: {
    sendClickEvent(payload) {
      this.$emit('click', payload)
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
