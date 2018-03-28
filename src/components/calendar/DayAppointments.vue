<template lang="pug">
  .day-appointments
    day-header(:date="date")
    .day
      template(v-for="h in 24*4")
        .quarter-hour(:class="{'hour': h % 4 === 0}")
      .reservation-pane
        .reservation-column
          template(v-for="r in reservations")
            reservation-item(:reservation="r"
                             @dblclick="editReservation(r)")
        //- reservation-item(v-show="newReservation.begin"
                         :reservation="newReservation"
                         @dblclick="createNewReservation"
                         is-new)
</template>

<script>
// TODO: day-header fixed in position (like Google Calendar)
// TODO: highlight today colmun

import DateTime from '@/types/util/DateTime'
import DayHeader from './components/DayHeader'
import ReservationItem from './components/ReservationItem'

export default {

  components: {
    DayHeader,
    ReservationItem
  },

  data() {
    return {
      reservations: []
    }
  },

  computed: {
    date() {
      return this.$store.state.calendar.selectedDate
    }

    // weight() {
    //   return Math.max(Object.keys(this.columns).length, 1)
    // }
  },

  created() {
    this.$store.dispatch('calendar/loadAppointmentsOnDay')
      .then(res => {
        this.reservations = res.map(b => ({
          name: b.getAppointment().getReservation().getName(),
          begin: DateTime.fromGwtTimestamp(b.getStart()),
          end: DateTime.fromGwtTimestamp(b.getEnd())
        }))
      })
      .catch(openErrorDialog)
  },

  methods: {
    // groupBy(array, prop) {
    //   return array.reduce((groups, item) => {
    //     let val = item[prop]
    //     if (val === undefined) {
    //       val = 0
    //     }
    //     if (!groups[val]) groups[val] = []
    //     groups[val].push(item)
    //     return groups
    //   }, {})
    // },

    // addReservation(h) {
    //   let hours = Math.floor((h - 1) / 4)
    //   let minutes = (h - 1 - (4 * hours)) * 15 || '00'
    //   let seconds = 0
    //   this.newReservation.begin = { hours, minutes, seconds }
    //   this.newReservation.end = { hours: hours + 1, minutes, seconds }
    //   this.newReservation.name = 'Neue Reservierung'
    // },

    editReservation(reservation) {
      this.$router.push({
        name: 'EditReservation',
        params: {
          id: reservation.id
        }
      })
    }

    // createNewReservation() {
    //   alert('navigate to create-new-reservation-dialog, keep from-to times')
    // }
  }
}
</script>

<style scoped lang="scss">

.day-appointments {
  flex-grow: 1
}

.day {
  border-top: 1px solid #e0e0e0;
}

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
