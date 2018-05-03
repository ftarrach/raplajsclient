<template lang="pug">
  div
    tree-select(
      v-model="val"
      :environment="items"
      :multiSelect="multiSelect"
      title="auswahl"
    )
    p {{ constraints }}
</template>

<script>
import TreeSelect from '@/ui/TreeSelect'

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
      }
    },

    treeFromCategory(id) {
      this.items = window.api.treeFactory
        .createModel(
          api.asSet([
            window.api.findCategoryById(
              id,
              window.api.facade.getSuperCategory()
            )
          ]),
          true
        )
        .children()
        .map(this.parseFromGwt)
    },

    treeFromAllCategories() {
      this.items = window.api.treeFactory
        .createModel(api.asSet([api.facade.getSuperCategory()]), true)
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
