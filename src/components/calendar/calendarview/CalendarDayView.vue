<template lang="pug">
  .rapla-calendar-day(:style="{'flex-grow': weight}")
    day-header(:date="date")
    .day
      template(v-for="h in 24*4")
        .quarter-hour(:class="{'hour': h % 4 === 0}"
                      @click="addReservation(h)")
      .reservation-pane
        .reservation-column(v-for="c in columns")
          template(v-for="r in c")
            reservation-item(:reservation="r"
                             @dblclick="editReservation(r)")
        reservation-item(v-show="newReservation.begin" :reservation="newReservation" is-new @dblclick="createNewReservation")
</template>

<script>
// TODO: day-header fixed in position (like Google Calendar)
// TODO: highlight today colmun

import DayHeader from './DayHeader'
import ReservationItem from './ReservationItem'
import moment from 'moment'

export default {

  components: {
    DayHeader,
    ReservationItem
  },

  props: {
    date: {
      // NOTE: type moment
      required: true
    },
    reservations: {
      // NOTE: type reservation[]
      required: true
    }
  },

  data() {
    return {
      // TODO: only once per week
      // TODO: can span multiple days
      // TODO: tap hold: drag the reservation
      newReservation: {
        begin: null,
        end: null
      }
    }
  },

  computed: {
    columns() {
      return this.groupBy(this.reservations, 'column')
    },
    weight() {
      return Math.max(Object.keys(this.columns).length, 1)
    }
  },

  methods: {
    groupBy(array, prop) {
      return array.reduce((groups, item) => {
        let val = item[prop]
        if (val === undefined) {
          val = 0
        }
        if (!groups[val]) groups[val] = []
        groups[val].push(item)
        return groups
      }, {})
    },

    addReservation(h) {
      let hour = Math.floor((h - 1) / 4)
      let min = (h - 1 - (4 * hour)) * 15 || '00'
      this.newReservation.begin = moment().hour(hour).minute(min)
      this.newReservation.end = this.newReservation.begin.clone().add(1, 'hour')
      this.newReservation.name = 'Neue Reservierung'
    },

    editReservation(reservation) {
      this.$router.push({
        name: 'EditReservation',
        params: {
          id: reservation.id
        }
      })
    },

    createNewReservation() {
      alert('navigate to create-new-reservation-dialog, keep from-to times')
    }

  }
}
</script>

<style scoped lang="scss">

.quarter-hour {
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  height: .75em;

  &:nth-child(-n + 32) {
    background: #efefef;
  }

  &:nth-last-child(-n + 25) {
    background: #efefef;
  }
}

.hour {
  border-bottom: 1px solid #bdbdbd;
}

.reservation-pane {
  position: relative;
  top: -.75em * 24*4;
  margin: 0;
  display: flex;
  padding: 0 0.5em;

  .reservation-column {
    flex-grow: 1;
    margin: 0 0.5em;
    position: relative;
  }
}
</style>
