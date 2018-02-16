<template lang="pug">
  .field
    label.label {{ title }}
    .field.has-addons
      .dropdown(:class='{ "is-active": open }')
        .dropdown-trigger.r-fullwidth
          button.button.is-fullwidth(@click='toggleMenu')
            span.dropdown-text {{ selectedCalendarName }}
            span.icon.is-small
              i.fa.fa-angle-down
        .dropdown-menu.r-fullwidth(role='menu')
          .dropdown-content
            .dropdown-item(v-for='calendar in calendars'
                           :key="calendar.id"
                           @click="choose(calendar)"
                           :class="{ 'is-active': calendar === value }")
              | {{ calendar.name }}
</template>

<script>

export default {

  created() {
    if (this.calendars.length > 0) {
      this.chooseFirst()
    }
    document.addEventListener('click', this.clickedOutside)
  },

  computed: {
    calendars() {
      return this.$store.getters.allCalendars
    },
    selectedCalendarName() {
      return this.value ? this.value.name : ''
    }
  },

  data() {
    return {
      open: false
    }
  },

  props: {
    title: {
      required: true,
      type: String
    },
    value: {
      type: Object // Resource Object
    }
  },

  methods: {
    toggleMenu() {
      if (this.open) {
        this.open = false
      } else {
        this.$nextTick(() => {
          this.open = !this.open
        })
      }
    },
    choose(resource) {
      this.open = false
      this.$emit('input', resource)
    },
    chooseFirst() {
      this.choose(this.calendars[0])
    },
    clickedOutside() {
      this.open = false
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickedOutside)
  }
}
</script>

<style scoped>

  .dropdown {
    flex-grow: 1;
  }

  .button {
    justify-content: flex-start;
  }

  .dropdown-text {
    align-self: stretch;
    flex-grow: 1;
    text-align: left;
  }

  .dropdown-content {
    max-height: 50vh;
    min-height: 2em;
    overflow-y: scroll;
  }

</style>

