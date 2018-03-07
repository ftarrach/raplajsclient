<template lang="pug">
  .columns.is-multiline
    .column.is-half(v-for="attribute in attributes")
      label.label {{ attribute.name }}
      template(v-if="attribute.type === 'STRING'")
        //- String
        input.input(:value="values[attribute.key]" @change="setClassificationValue(attribute.key, $event.target.value)")
      template(v-else-if="attribute.type === 'INT'")
        //- Number
        input.input(:value="values[attribute.key]" @change="setClassificationValue(attribute.key, $event.target.value)")
      template(v-else-if="attribute.type === 'BOOLEAN'")
        //- Boolean
        //- TODO: use bulma-switch?
        .b-checkbox.is-primary
          | #[input#whole-day(type="checkbox" :value="values[attribute.key]" @input="setClassificationValue(attribute.key, $event.target.checked)").styled] #[label(for="whole-day") {{ attribute.name }}]
      template(v-else-if="attribute.type === 'DATE'")
        //- Date
        b-datepicker(:value="toMoment(values[attribute.key])"
                     @input="setClassificationValue(attribute.key, $event)")
      template(v-else-if="attribute.type === 'CATEGORY'")
        //- Category
        .drilldown.is-flex
          b-drilldown(:items="drilldownCategories(attribute)"
                      :value="values[attribute.key]"
                      selectable-container
                      @input="setClassificationValue(attribute.key, $event)")
            b-drilldown-item(slot="leaf" slot-scope="{ item, selected }" :item="item" :selected="selected")
            b-drilldown-container(slot="node" slot-scope="{ item, selected }" :item="item" :selected="selected")
      template(v-else-if="attribute.type === 'ALLOCATABLE'")
        //- Allocatable
        b-drilldown(:items="drilldownAllocatables(attribute)"
                    :value="values[attribute.key]"
                    @input="setClassificationValue(attribute.key, $event)"
                    :multi-select="isMultiselect(attribute)")
          b-drilldown-container(slot="node" slot-scope="{ item, selected }" :item="item" :selected="selected")
          b-drilldown-item(slot="leaf" slot-scope="{ item, selected }" :item="item" :selected="selected")
</template>

<script>
// THINK: Show Button, open Dialog containing drilldown

import { toDrilldownItem as categoryToDrilldownItem } from '@/types/Category'
import { toDrilldownItem as allocatableToDrilldownItem } from '@/types/Allocatable'
import { sortByName } from '@/types/Nameable'
import DateTime from '@/types/util/DateTime'

export default {

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

    hasDynamicType(attribute) { return attribute.constraints['dynamic-type'] !== null },
    toMoment(val) { return DateTime.toMoment(val) },
    isMultiselect(attribute) { return attribute.constraints['multi-select'] },

    setClassificationValue(key, value) {
      if (value._isAMomentObject) {
        value = DateTime.fromMoment(value)
      }
      this.$store.commit('reservationform/updateClassificationValue', { key, value })
    },

    drilldownCategories(attribute) {
      return this.$store.getters['facade/category'](attribute.constraints['root-category']).subcategories.map(categoryToDrilldownItem)
    },

    drilldownAllocatables(attribute) {
      if (this.hasDynamicType(attribute)) {
        return this.drilldownAllocatablesWithType(attribute.constraints['dynamic-type'])
      } else {
        return this.drilldownAllocatablesRoot()
      }
    },

    drilldownAllocatablesWithType(resourcetypeid) {
      let allocatables = this.$store.getters['facade/allocatablesForType'](resourcetypeid)
      if (allocatables.length > 0) {
        // TODO: build a tree (subrooms, etc)
      }
      return allocatables.sort(sortByName).map(allocatableToDrilldownItem)
    },

    drilldownAllocatablesRoot() {
      return this.$store.getters['facade/allResourcetypes'].sort(sortByName).map(type => {
        return [
          {
            id: type.id,
            label: type.name,
            children: this.$store.getters['facade/allocatablesForType'](type.id).sort(sortByName).map(a => ({ id: a.id, label: a.name }))
          }
        ]
      }).reduce((acc, arr) => { acc.push(...arr); return acc }, [])
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../assets/sass/bulma.scss';

  .drilldown {
    height: 16em;

    @include mobile {
      height: 24em;
    }
  }
</style>
