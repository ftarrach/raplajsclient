<template lang="pug">
  v-card
    v-card-text
      v-layout(row wrap)
        v-flex(xs12 md6 lg6
          v-for="attribute in attributes"
          :key="attribute.id"
        )
          v-layout
            v-flex(xs4 sm6)
              v-subheader {{ attribute.name }}
            v-flex(xs8 sm6)
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
      return this.type.attributes
    }
  },

  methods: {
    updateAttribute(e) {
      this.$emit('input', e)
    }
  }
}
</script>
