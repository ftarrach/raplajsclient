<template lang="pug">
  .container
    .card
      header.card-header
        p.card-header-title {{ title }}
        b-button(icon="fa-arrow-left" no-text @click="back" pull-right)
      .card-content
        .columns.is-multiline
          //- Name
          .column.is-half
            label.label {{ "name" | gwt-localize }}
            input.input(v-model="name")
          //- Reservation Type
          .column.is-half
            label.label {{ "reservation_type" | gwt-localize }}
            reservation-type-chooser(v-model="type")
          //- Appointments
          .column.is-half
            label.label {{ "reservation.appointments" | gwt-localize }}
            reservation-form-appointment-list(v-model="selectedAppointmentId" :appointments="appointments")
            .columns.is-size-7
          //- Appointment Edit
          .column.is-half
            label.label &nbsp;
            reservation-form-appointment-detail(v-model="selectedAppointment")
          .column.is-half
            label.label {{ "reservation.used_resources" | gwt-localize }}
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
            label.label {{ "reservation.allocations" | gwt-localize }}
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
    footer
      .card-footer
        a.card-footer-item(href="#") Löschen
        a.card-footer-item(href="#") Speichern
</template>

<script>

import ReservationTypeChooser from '@/components/widgets/ReservationTypeChooser'
import ReservationFormAppointmentList from './ReservationFormAppointmentList'
import ReservationFormAppointmentDetail from './ReservationFormAppointmentDetail'
import ReservationFormResourcesList from './ReservationFormResourcesList'
import moment from 'moment'

export default {

  components: {
    ReservationTypeChooser,
    ReservationFormAppointmentList,
    ReservationFormAppointmentDetail,
    ReservationFormResourcesList
  },

  props: {
    title: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      id: null,
      type: {},
      name: '',
      appointments: [],
      resources: [],
      selectedAppointmentId: 0
    }
  },

  computed: {
    allResources() {
      return this.$store.getters.allResources
    },

    selectedAppointment: {
      get() {
        return this.appointments.filter(a => a.id === this.selectedAppointmentId)[0]
      },
      set(newVal) {
        this.selectedAppointmentId = newVal.id
      }
    }
  },

  created() {
    this.appointments = [
      {
        id: 10,
        repeat: {
          type: 'weekly',
          interval: 1,
          times: 1
        },
        begin: moment('2017-10-03'),
        days: [0, 1],
        time: {
          from: '09:00',
          to: '11:15',
          endtype: 'same-day'
        },
        end: null,
        enddatetype: 'infinity'
      },
      {
        id: 11,
        repeat: {
          type: 'weekly',
          interval: 1,
          times: 1
        },
        begin: moment('2017-10-04'),
        days: [2],
        time: {
          from: '09:15',
          to: '11:30',
          endtype: 'x-day',
          xday: 1
        },
        end: moment('2017-12-20'),
        enddatetype: 'until'
      }
    ]
    this.selectedAppointmentId = this.appointments[0].id
    let id = this.$route.params.id
    let found = this.$store.getters.reservationById(id)
    if (found.length > 0) {
      let reservation = found[0]
      this.id = id
      this.resources = reservation.resources.slice(0)
      this.type = reservation.type
      this.name = reservation.name
    } else {
      // TODO: if id is set, but not found in store, show an error to the user
      alert(`no reservation with id ${id} found`)
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },
    addResourceToReservation(resource) {
      this.resources.push(resource)
      this.resources.sort((a, b) => a.id - b.id) // sort by IDs
    },
    removeResourceFromReservation(resource) {
      const index = this.resources.indexOf(resource)
      this.resources.splice(index, 1)
    },

    isAllFree(resource) {
      return (typeof resource.free === 'boolean') && resource.free
    },
    isSometimesFree(resource) {
      return resource.free instanceof Array
    }
  },

  filters: {
    list(input) {
      return input.join()
    }
  }
}
</script>

<style scoped>
  .card {
    margin: 2em 0
  }

  header.card-header {
    padding-right: 8px;
    align-items: center;
  }
</style>