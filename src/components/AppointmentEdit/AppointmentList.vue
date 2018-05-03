<template lang="pug">
  v-card
    v-card-title(primary-title)
      h3 {{ header }}
    v-card-actions
      v-layout
        v-flex(xs4 v-for="button in buttons" :key="button.text").text-xs-center
          v-tooltip(bottom)
            v-btn(slot="activator" flat icon :color="button.color")
              v-icon {{ button.icon }}
            span {{ button.text }}
    v-flex
      v-list(:value="[selectedId]" two-line)
        v-list-tile(
          ripple
          v-for="a in items"
          :key="a.id"
          :class="{'blue white--text': selectedId === a.id}"
          @click="selected(a.id)"
        )
          v-list-tile-content
            v-list-tile-title {{ a.title }}
            v-list-tile-sub-title {{ a.subtitle }}
</template>

<script>

export default {
  props: {
    appointments: {
      type: Array,
      required: true
    },

    gwtAppointments: {
      type: Array,
      required: true
    },

    selectedId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      header: 'Appointments:',
      // TODO: localize
      buttons: [
        {
          color: 'green',
          icon: 'note_add',
          text: 'Add'
        },
        {
          color: 'red',
          icon: 'delete',
          text: 'Delete'
        },
        {
          color: 'orange',
          icon: 'fast_forward',
          text: 'Free Appointment'
        }
      ]
    }
  },

  computed: {
    items() {
      if (window.api && this.gwtAppointments.length > 0) {
        return this.labelsFromGwt
      } else {
        return this.labelsStandalone
      }
    },

    labelsStandalone() {
      return this.appointments.map(a => ({
        id: a.id,
        title: `${a.start.toString} - ${a.end.toString()}`,
        subtitle: a.repeating ? a.repeating.interval : 'No Repeating'
      }))
    },

    labelsFromGwt() {
      return this.appointments.map(a => {
        const gwtAppointment = this.gwtAppointments.find(
          g => g.getId() === a.id
        )
        console.log(gwtAppointment)
        return {
          id: a.id,
          title: window.api.appointmentFormater.getSummary(gwtAppointment),
          subtitle: window.api.appointmentFormater.getSummaryOfRepeating(gwtAppointment.getRepeating())
        }
      })
    }
  },

  methods: {
    selected(appointment) {
      this.$emit('select', appointment)
    }
  }
}
</script>

<style scoped>
.blue.white--text * {
  color: inherit;
}
</style>
