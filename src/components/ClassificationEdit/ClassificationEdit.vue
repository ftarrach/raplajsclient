<template lang="pug">
  v-layout(wrap)
    v-flex(xs12 md6 lg6
      v-for="attribute in attributes"
      :key="attribute.id"
    )
      v-layout
        v-flex(xs6)
          v-subheader {{ attribute.name }}
          //- p {{ attribute.type }}
          //- p {{ attribute.constraints }}
          //- p {{ attribute.annotations }}
        v-flex(xs6)
          classification-input(
            :attribute="attribute"
            :constraints="attribute.constraints"
            :annotations="attribute.annotations"
            :value="classification.data[attribute.key]"
            :name="attribute.key"
            @input="updateAttribute"
          )
</template>

<script>

import ClassificationInput from './ClassificationInput/ClassificationInput'

export default {

  components: {
    ClassificationInput
  },

  props: {
    classification: {
      type: Object,
      required: true
    },

    type: {
      // type: DynamicType,
      required: true
    }
  },

  computed: {
    attributes() {
      return this.type.attributes.filter(a => a.annotations['edit-view'] !== 'additional-view')
    }
  },

  methods: {
    updateAttribute(e) {
      this.$emit('input', e)
    }
  }
}
</script>
