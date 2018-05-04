<template lang="pug">
  v-dialog(v-model="visible" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly")
    slot(slot="activator" name="activator")
    v-card
      v-toolbar(color="primary" dark)
        v-toolbar-title {{ title }}
        v-spacer
        v-btn(@click="close" icon)
          v-icon close
      v-layout(column)
        v-list
          v-list-tile(v-if="path.length > 0" @click="back")
            v-list-tile-title
              v-layout(row)
                v-icon.mr-2 arrow_back
                span {{ "back" | localize }}
          v-list-tile(
            v-for="item in currentItems"
            :key="item.name"
            @click="clicked(item)"
            :class="{'primary': selected.includes(item.id)}"
          )
            v-list-tile-title
              v-layout(row)
                v-icon.mr-2(:color="item.icon ? 'inherit' : 'transparent'") {{ item.icon ? item.icon : 'play_arrow'}}
                span(:class="{'white--text': selected.includes(item.id)}") {{ item.label }}
                v-spacer
                v-icon(
                  v-if="item.items"
                  @click.stop="openGroup(item)"
                  :dark="selected.includes(item.id)"
                ) play_arrow
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },

    selected: {
      type: Array,
      required: false,
      default: () => []
    },

    closeOnSelect: {
      type: Boolean,
      required: false,
      default: () => false
    },

    selectableGroups: {
      type: Boolean,
      required: false,
      default: () => false
    },

    title: {
      type: String,
      required: false,
      default: () => ''
    }
  },

  data() {
    return {
      visible: false,
      path: []
    }
  },

  computed: {
    currentItems() {
      let level = this.items
      for (let part of this.path) {
        level = level.find(i => i.id === part).items
      }
      if (this.path.length > 0 && this.selectableContainer) {
        let currentFather = this.currentFatherCategory
        if (currentFather) {
          level = [
            { id: currentFather.id, label: currentFather.label, father: true }
          ].concat(level)
        }
      }
      return level
    }
  },

  methods: {
    clicked(item) {
      if (this.selectableGroups && item.items) {
        this.$emit('selected', item)
      } else {
        if (item.items) {
          this.openGroup(item)
        } else {
          this.$emit('selected', item)
          if (this.closeOnSelect) {
            this.visible = false
          }
        }
      }
    },

    openGroup(item) {
      this.path.push(item.id)
    },

    back() {
      this.path.pop()
    },

    close() {
      this.visible = false
      this.path = []
    }
  },

  watch: {
    visible(newValue, oldValue) {
      if (newValue) {
        this.path = []
        this.$emit('before-open')
      }
    }
  }
}
</script>
