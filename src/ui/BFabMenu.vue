<template lang="pug">
  .fab-menu
    b-fab(@click.stop="toggleMenu" :icon="icon" :color="color" :top="top" :left="left" :bottom="bottom" :right="right")
    .fixed-corner(:class="classes" v-show="showMenu")
      .menu
        b-drilldown(:items="items" no-menu @input="selected")
          div(slot="leaf" slot-scope="{ item }")
            .seperator(v-if="item.seperator")
            b-drilldown-menu-item(:item="item" v-else)
</template>

<script>
export default {

  name: 'BFabMenu',

  props: {
    icon: {
      type: String,
      required: true
    },

    color: {
      type: String,
      required: false,
      default: () => 'green'
    },

    top: {
      type: Boolean,
      required: false,
      default: () => false
    },

    bottom: {
      type: Boolean,
      required: false,
      default: () => false
    },

    left: {
      type: Boolean,
      required: false,
      default: () => false
    },

    right: {
      type: Boolean,
      required: false,
      default: () => false
    },

    items: {
      type: Array, // Array[{String icon, String label, Action onClick}]
      required: false,
      default: []
    }
  },

  data() {
    return {
      showMenu: false
    }
  },

  created() {
    document.addEventListener('click', this.clickedOutside)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickedOutside)
  },

  computed: {
    classes() {
      const classes = [
        `is-${this.position}`
      ]
      return classes
    },

    position() {
      const horizontal = this.left ? 'left' : 'right'
      const vertical = this.top ? 'top' : 'bottom'
      return `${vertical}-${horizontal}`
    }
  },

  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
      if (this.showMenu) {
        this.$emit('opened')
      }
    },

    selected(selectedId) {
      this.$emit('selected', selectedId[0])
      this.showMenu = false
    },

    clickedOutside() {
      this.showMenu = false
    }
  }

}
</script>

<style scoped lang="scss">

  @import '../assets/sass/bulma.scss';

  .is-bottom-left .menu,
  .is-bottom-right .menu, {
    display: block;
    position: fixed;
    right: 2em;
    bottom: 6em;
  }

  .menu .drilldown {
    min-width: 5em;
    background: white;
  }

  .seperator {
    height: 0.05em;
    background: #dbdbdb;
  }

</style>
