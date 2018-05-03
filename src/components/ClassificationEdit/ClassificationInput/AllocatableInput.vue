<template lang="pug">
  tree-select(
    v-model="val"
    :environment="items"
    :multiSelect="multiSelect"
    title="auswahl"
  )
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
          type: 'ALLOCATABLE',
          name: this.name,
          newVal
        })
      }
    }
  },

  created() {
    this.buildTree(this.constraints['dynamic-type'])
    this.multiSelect = this.constraints['multi-select']
  },

  methods: {
    buildTree(dynamicType) {
      if (window.api) {
        if (dynamicType) {
          this.treeFromDynamicType(dynamicType)
        } else {
          this.treeFromAllAllocatables()
        }
      }
    },

    treeFromDynamicType(id) {
      let dynamictypes = [
        ...api.facade.getDynamicTypes('resource'),
        ...api.facade.getDynamicTypes('person')
      ]
      this.items = window.api.treeFactory
        .createAllocatableModel([
          dynamictypes
            .find(a => a.getId() === id)
            .newClassificationFilter()
        ])
        .getAllocatableNode()
        .children()[0]
        .children()
        .map(this.parseFromGwt)
    },

    treeFromAllAllocatables() {
      this.items = api.treeFactory
        .createClassifiableModel(api.facade.getAllocatables())
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
