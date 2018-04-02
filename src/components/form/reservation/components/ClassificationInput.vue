<template lang="pug">
  div
    label.label {{ attribute.name }}
    template(v-if="attribute.type === 'STRING'")
      //- String
      input.input(:value="value"
                  @change="fire($event.target.value)")
    template(v-else-if="attribute.type === 'INT'")
      //- Number
      input.input(:value="value"
                  @change="fire($event.target.value)")
    template(v-else-if="attribute.type === 'BOOLEAN'")
      //- Boolean
      //- TODO: use bulma-switch?
      .b-checkbox.is-primary
        | #[input#whole-day(type="checkbox" :checked="value" @input="fire($event.target.checked)").styled] #[label(for="whole-day") {{ attribute.name }}]
    template(v-else-if="attribute.type === 'DATE'")
      //- Date
      b-datepicker(:value="value"
                   @input="fire($event)")
    template(v-else-if="attribute.type === 'CATEGORY'")
      //- Category
      .drilldown.is-flex
        b-drilldown(:items="drilldownCategories(attribute)"
                    :value="value"
                    selectable-container
                    nullable
                    @input="fire($event)")
          b-drilldown-container(slot="node"
                                slot-scope="{ item, selected }"
                                :item="item"
                                :selected="selected"
                                :values="value")
          b-drilldown-item(slot="leaf"
                           slot-scope="{ item, selected }"
                           :item="item"
                           :selected="selected")
    template(v-else-if="attribute.type === 'ALLOCATABLE'")
      //- Allocatable
      b-drilldown(:items="drilldownAllocatables(attribute)"
                  :value="value"
                  @input="fire($event)"
                  :multi-select="isMultiselect(attribute)")
        b-drilldown-container(slot="node"
                              slot-scope="{ item, selected }"
                              :item="item"
                              :selected="selected"
                              :values="value")
        b-drilldown-item(slot="leaf"
                         slot-scope="{ item, selected }"
                         :item="item"
                         :selected="selected")
</template>

<script>

import { toDrilldownItem as categoryToDrilldownItem } from '@/types/Category'
import { toDrilldownItem as allocatableToDrilldownItem } from '@/types/Allocatable'
import { sortByName } from '@/types/Nameable'
import Attribute from '@/types/Attribute'

export default {

  props: {
    attribute: {
      type: Attribute,
      required: true
    },

    value: {
      required: true
    }
  },

  methods: {

    isMultiselect(attribute) { return attribute.constraints['multi-select'] },
    hasDynamicType(attribute) { return attribute.constraints['dynamic-type'] !== null },

    fire(newValue) {
      this.$emit('input', newValue)
    },

    drilldownCategories(attribute) {
      let rootCat = attribute.constraints['root-category']
      if (rootCat) {
        return this.$store.getters['facade/category'](attribute.constraints['root-category']).subcategories.map(categoryToDrilldownItem)
      } else {
        let whole = this.$store.getters['facade/category']('category_0').subcategories.map(categoryToDrilldownItem)
        if (whole) {
          return whole
        } else {
          return []
        }
      }
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
