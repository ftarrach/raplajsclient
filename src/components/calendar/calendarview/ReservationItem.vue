<template lang="pug">
  .reservation-item(:style='style' :class="{'is-new': isNew}" @dblclick="doubleClicked")
    p {{ time }}
    p {{ reservation.name }}
    p(v-for='person in persons')
      strong {{ person }}
    p(v-for='resource in resources')
      | {{ resource }}
</template>

<script>

export default {

  props: {
    reservation: {
      // NOTE: type reservation[]
      required: true
    },
    isNew: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  computed: {
    persons() {
      if (this.reservation.persons) {
        return this.reservation.persons.map(p => p.toString())
      }
    },
    resources() {
      if (this.reservation.resources) {
        return this.reservation.resources.map(r => r.toString())
      }
    },
    time() {
      if (this.reservation.begin) {
        return `${this.reservation.begin.format('LT')} - ${this.reservation.end.format('LT')}`
      }
    },
    style() {
      if (this.reservation.begin) {
        let start = this.reservation.begin.hour() + this.reservation.begin.minute() / 60
        let duration = this.reservation.end.hour() - this.reservation.begin.hour() + (this.reservation.end.minute() - this.reservation.begin.minute()) / 60
        return {
          top: start * 3 + 'em',
          height: duration * 3 + 'em'
        }
      } else {
        return {}
      }
    }
  },

  methods: {
    doubleClicked() {
      this.$emit('dblclick')
    }
  }
}
</script>

<style scoped lang='scss'>
  .reservation-item {
    background: #0d47a1;
    color: #fff;
    margin-top: -1px;
    padding: .5em;
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
    left: 0;
    right: 0;
    cursor: pointer;
    user-select: none;

    &.is-new {
      background: #82b1ff;
      margin: 0 1em;
    }

    p {
      line-height: 1em;

      strong {
        color: white;
      }
    }
  }
</style>
