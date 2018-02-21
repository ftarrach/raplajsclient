<template lang="pug">
  .columns
    .column.is-half
      label.label {{ "reservation.allocations" | gwt-localize }}
      reservation-form-resources-list(:resources="allResources" @click="addResourceToReservation")
        div(slot="buttons")
          b-button(icon="fa-calendar-alt") {{ "calendar" | gwt-localize }}
          b-button(icon="fa-filter" pull-right) {{ "filter" | gwt-localize }}
        div(slot="item-action" slot-scope="prop")
          p.has-text-success(v-if="isAllFree(prop.resource)")
            | {{ "every_appointment" | gwt-localize }}
          p(v-else-if="isSometimesFree(prop.resource)")
            | auswählbar an {{ prop.resource.free | list }}
    .column.is-half
      label.label {{ "reservation.used_resources" | gwt-localize }}
      reservation-form-resources-list(:resources="resources"
                                      @click="removeResourceFromReservation")
        div(slot="buttons")
          b-button(icon="fa-calendar-alt") {{ "calendar" | gwt-localize }}
        div(slot="item-action" slot-scope="prop")
         .dropdown.is-pulled-right
            .dropdown-trigger(@click.stop="")
              button.button
                span.dropdown-text {{ "every_appointment" | gwt-localize }}
                span.icon.is-small
                  i.fa.fa-angle-down
            .dropdown-menu(role='menu')
              .dropdown-content
                | TODO: Add items here
                | TODO: Add open parameter
</template>

<script>

import ReservationFormResourcesList from './ReservationFormResourcesList'

export default {

  components: {
    ReservationFormResourcesList
  },

  props: {
    value: {
      type: Array // array of resources to display in the list
    }
  },

  computed: {
    allResources() {
      return this.$store.getters.allResources
    },
    resources: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    }
  },

  methods: {
    isAllFree(resource) {
      return (typeof resource.free === 'boolean') && resource.free
    },
    isSometimesFree(resource) {
      return resource.free instanceof Array
    },

    addResourceToReservation(resource) {
      if (this.resources.filter(r => r.id === resource.id).length === 0) {
        this.resources.push(resource)
        this.resources.sort((a, b) => a.id - b.id) // sort by IDs
      }
    },
    removeResourceFromReservation(resource) {
      const index = this.resources.indexOf(resource)
      this.resources.splice(index, 1)
    }
  },

  filters: {
    list(input) {
      return input.join()
    }
  }
}
</script>
