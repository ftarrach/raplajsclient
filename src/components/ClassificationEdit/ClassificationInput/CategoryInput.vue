<template lang="pug">
  tree-select(
    v-model="val"
    :items="items"
    :multiSelect="multiSelect"
    title="auswahl"
    selectable-groups
  )
</template>

<script>
import TreeSelect from '@/ui/TreeSelect'
import demodata from './demodata'

export default {
  components: {
    TreeSelect
  },

  props: {
    value: {
      type: Array
    },

    constraints: {
      type: Object
    },

    name: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      items: [],
      multiSelect: false
    }
  },

  computed: {
    val: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', {
          type: 'CATEGORY',
          name: this.name,
          newVal
        })
      }
    }
  },

  created() {
    this.buildTree(this.constraints['root-category'])
    this.multiSelect = this.constraints['multi-select']
  },

  methods: {
    buildTree(id) {
      if (window.api) {
        if (id) {
          this.treeFromCategory(id)
        } else {
          this.treeFromAllCategories()
        }
      } else {
        this.items = demodata.categories
      }
    },

    treeFromCategory(id) {
      this.items = window.api.treeFactory
        .createModel(window.api.findCategoryById(id), null)
        .children()
        .map(this.parseFromGwt)
    },

    treeFromAllCategories() {
      this.items = window.api.treeFactory
        .createModel(window.api.facade.getSuperCategory(), null)
        .children()
        .map(this.parseFromGwt)
    },

    parseFromGwt(item) {
      const items = [...item.children().map(this.parseFromGwt)]
      return {
        id: item.userObject.getId(),
        label: item.label,
        items: items.length > 0 ? items : null
      }
    }
  }
}
</script>
