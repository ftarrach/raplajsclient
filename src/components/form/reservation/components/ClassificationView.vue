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
      //- template(v-else-if="attribute.type === 'CATEGORY'")
        //- Category
        //- TODO: events
        //- THINK: Show Button, open Dialog containing drilldown
        .drilldown.is-flex
          //- p {{ attribute.constraints['root-category'] !== null }}
          template(v-if="isMultiselect(attribute)")
            //- category multi select
            p TODO: build category with multiselect
          template(v-else)
            //- category single select
            p {{ attribute }}
            b-drilldown(:items="drilldownCategories(attribute)"
                        :value="values[attribute.key]"
                        @input="setClassificationValue(attribute.key, $event)")
              b-drilldown-item(slot="item" slot-scope="{ item, selected }" :item="item" :selected="selected")
              b-drilldown-container(slot="container" slot-scope="{ item, selected }" :item="item" :selected="selected")
      template(v-else-if="attribute.type === 'ALLOCATABLE'")
        //- Allocatable
        template(v-if="hasDynamicType(attribute)")
          //- simple allocatable menu
          b-drilldown(:items="drilldownAllocatables(attribute)"
                      :value="values[attribute.key]"
                      @input="setClassificationValue(attribute.key, $event)"
                      :multi-select="isMultiselect(attribute)")
            b-drilldown-item(slot="item" slot-scope="{ item, selected }" :item="item" :selected="selected")
        template(v-else)
          b-drilldown(:items="drilldownRootAllocatables(attribute)"
                      :value="values[attribute.key]"
                      @input="setClassificationValue(attribute.key, $event)"
                      :multi-select="isMultiselect(attribute)")
            b-drilldown-item(slot="item" slot-scope="{ item, selected }" :item="item" :selected="selected")
</template>

<script>

import { toDrilldownItem as categoryToDrilldownItem } from '@/types/Category'
import { toDrilldownItem as allocatableToDrilldownItem } from '@/types/Allocatable'
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

    toMoment(val) {
      return DateTime.toMoment(val)
    },

    setClassificationValue(key, value) {
      if (value._isAMomentObject) {
        value = DateTime.fromMoment(value)
      }
      this.$store.commit('reservationform/updateClassificationValue', { key, value })
    },

    hasDynamicType(attribute) { return attribute.constraints['dynamic-type'] !== null },
    hasCategory(attribute) { return attribute.constraints['root-category'] !== null },
    isMultiselect(attribute) { return attribute.constraints['multi-select'] },

    drilldownCategories(attribute) {
      if (this.hasCategory(attribute)) {
        return attribute.constraints['root-category'].subcategories.map(categoryToDrilldownItem)
      } else {
        // TODO: baum bauen
        return [ {id: 0, label: '// TODO'} ]
      }
    },

    drilldownAllocatables(attribute) {
      if (this.hasDynamicType(attribute)) {
        let type = attribute.constraints['dynamic-type']
        return this.$store.getters['facade/allocatablesForType'](type.id).sort((a, b) => a.name.localeCompare(b.name)).map(allocatableToDrilldownItem)
      } else {
        // TODO: baum bauen
        return [ {id: 0, label: '// TODO'} ]
      }
    },

    drilldownRootAllocatables() {
      let a = Object.values(this.$store.state.facade.resourcetypes)
      let b = a.map(dt => this.$store.getters['facade/allocatablesForType'](dt.id))
      // TODO: hier fragen, wie ich an "Informatik" und "Technik" herankomme
      // debug(
      //   Object.values(raplaVue.$store.state.facade.resourcetypes).map(d =>
      //     (
      //       {
      //         id: d.id,
      //         name: d.name,
      //         children: raplaVue.$store.getters['facade/allocatablesForType'](d.id).map(a =>
      //           {
      //             if (a instanceof DynamicType) {
      //               return DynamicType.fromGwt(a)
      //             } else {
      //               return {
      //                 id: a.id,
      //                 name: a.name
      //               }
      //             }
      //           }
      //         )
      //       }
      //     )
      //   )
      // )
      return []
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
