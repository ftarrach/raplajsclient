<template lang="pug">
  .columns.is-multiline
    .column(v-for="attribute in attributes")
      classification-input(:attribute="attribute"
                           :value="values[attribute.key]"
                           @click="newVal => setClassificationValue(attribute.key, newVal)")
</template>

<script>
// THINK: Show Button, open Dialog containing drilldown

import DateTime from '@/types/util/DateTime'
import ClassificationInput from '../components/ClassificationInput'

export default {

  name: 'AdditionalClassificationView',

  components: {
    ClassificationInput
  },

  data() {
    return {
      values: {}
    }
  },

  computed: {
    attributes() {
      // TODO: only show attributes from this type which are in the main view. This is currently not possible, because class Annotatable isn't a JsType
      let attributes = this.$store.state.reservationform.type.attributes
      attributes.forEach(a => this.$set(this.values, a.key, this.$store.state.reservationform.classifications.data[a.key]))
      return attributes
    }
  },

  methods: {
    setClassificationValue(key, value) {
      if (value._isAMomentObject) {
        value = DateTime.fromMoment(value)
      }
      this.$store.commit('reservationform/updateClassificationValue', { key, value })
    }
  }
}
</script>
