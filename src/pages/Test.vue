<template lang="pug">
  div
    //- p {{ debug }}
    reservation-form(:reservation="reservation" :gwt-reservation="gwtReservation" v-if="reservation")
  //- v-container
  //-   tree-view
    //- v-subheader multiselect
    //- tree-select(
    //-   v-model="value"
    //-   :environment="items"
    //-   elementName="label"
    //-   multi-select
    //- )
    //- v-subheader multiselect selectable groups
    //- tree-select(
    //-   v-model="value2"
    //-   :environment="items"
    //-   elementName="label"
    //-   multi-select
    //-   selectable-groups
    //- )
    //- r-spinner(v-model="number")
</template>

<script>
// Use this page to test things

import TreeSelect from '../ui/TreeSelect'
import TreeView from '@/components/TreeView/TreeView'
import ReservationForm from '@/pages/ReservationForm/ReservationForm'
import demodata from '@/pages/ReservationForm/demodata'
import Reservation from '@/types/Reservation'

export default {
  components: {
    TreeSelect,
    TreeView,
    ReservationForm
  },

  data() {
    return {
      value: [],
      value2: [],
      environment: [],
      number: 0,
      debug: '',
      reservation: null,
      gwtReservation: null
    }
  },

  created() {
    // this.reservation = demodata
    if (window.api) {
      // DEBUG: load first reservation
      api.facade
        .getReservationsAsync(
          api.getUser(),
          api.calendarModel.getStartDate(),
          api.calendarModel.getEndDate(),
          null
        )
        .thenApply(r => {
          const res = api.toArray(r)[0]
          this.gwtReservation = res
          this.reservation = Reservation.fromGwt(res)
        })
        .exceptionally(console.error)
    } else {
      this.reservation = demodata
    }

    this.value = ['3']
    this.value2 = ['2']
    this.items = [
      {
        id: 'New',
        icon: 'create',
        label: 'New',
        items: [
          {
            id: '1',
            label: 'Event'
          },
          {
            id: '2',
            label: 'Vorlesung'
          }
        ]
      },
      {
        id: '3',
        label: 'Auswahl löschen'
      },
      {
        id: '4',
        label: 'Bearbeiten'
      },
      {
        id: '5',
        label: 'Besitzer ändern'
      }
    ]
  }
}
</script>
