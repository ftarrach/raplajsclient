<template lang="pug">
  div
    table.table.is-hoverable.is-fullwidth
      thead
        tr
          th(v-for="column in columns")
            | {{ column.name }}
          th
      tbody
        //- TODO: I need an id for a row
        tr(v-for='(row, index) in rows' @dblclick="edit(index)")
          td(v-for="(element) in row")
            | {{ element }}
          td
            b-dropdown(is-right)
              b-dropdown-item(v-for="item in dropdownitems"
                              :key="item.label"
                              :value="item.label"
                              :icon="item.icon"
                              @click="() => item.onClick(event)")
    b-fab(icon="plus" @click="newReservation" bottom left)
</template>

<script>

export default {

  data() {
    return {
      columns: [],
      rows: []
    }
  },

  computed: {
    dropdownitems() {
      return [
        {
          label: this.$store.getters['locale/localize']('new'),
          icon: 'user',
          onClick: this.create
        },
        {
          label: this.$store.getters['locale/localize']('edit'),
          icon: 'edit',
          onClick: this.edit
        },
        {
          label: this.$store.getters['locale/localize']('delete'),
          icon: 'trash-alt',
          onClick: this.remove
        },
        {
          label: this.$store.getters['locale/localize']('view'),
          icon: 'info-circle',
          onClick: this.show
        },
        {
          label: this.$store.getters['locale/localize']('copy'),
          icon: 'clipboard',
          onClick: this.copy
        },
        {
          label: this.$store.getters['locale/localize']('cut'),
          icon: 'cut',
          onClick: this.cut
        }
      ]
    }
  },

  created() {
    this.$nextTick(() => {
      this.$store.dispatch('calendar/loadReservations')
        .then(result => {
          console.log('reservations loaded')
          this.columns = result.columns
          this.rows = result.rows
          this.$options.gwtObjects = result.gwtObjects
        })
        .catch(openErrorDialog)
    })
  },

  methods: {
    create() {
      alert('create')
    },

    changeOwner() {
      alert('changeOwner')
    },

    remove() {
      alert('todo') // TODO: implement me
    },

    edit(rowIndex) {
      console.log(this.$options.gwtObjects)
      this.$router.push({
        name: 'EditReservation',
        params: {
          id: this.$options.gwtObjects[rowIndex].getId()
        }
      })
    },

    show(event) {
      alert('show')
    },

    copy() {
      alert('copy')
    },

    cut() {
      alert('cut')
    },

    newReservation() {
      this.$router.push({
        name: 'NewReservation'
      })
    }
  }
}
</script>

<style scoped>
  .table tbody tr {
    cursor: pointer
  }

  .table td {
    user-select: none;
  }
</style>
