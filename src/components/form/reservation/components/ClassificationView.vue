<template lang="pug">
  .columns.is-multiline
    .column.is-half(v-for="attribute in attributes")
      label.label {{ attribute.name }}
      template(v-if="attribute.type === 'STRING'")
        //- String
        input.input
      template(v-if="attribute.type === 'INT'")
        //- Number
        input.input
      template(v-if="attribute.type === 'BOOLEAN'")
        //- Boolean
        //- TODO: use bulma-switch?
        .b-checkbox.is-primary
          | #[input#whole-day(type="checkbox").styled] #[label(for="whole-day") {{ attribute.name }}]
      template(v-if="attribute.type === 'DATE'")
        //- Date
        b-datepicker
      template(v-if="attribute.type === 'CATEGORY'")
        //- Category
        //- TODO: Multiselect via (v-if="attribute.constraints['multi-select']")
        //- THINK: Show Button, open Dialog displaying drilldown
        .drilldown.is-flex
          b-drilldown(:items="drilldownCategories(attribute)")
            p(slot="item" slot-scope="{ item }")
              | {{ item.label }}
            p(slot="container" slot-scope="{ item }")
              | {{ item.label }}
            fa-icon(icon="fa-caret-right" pull-right)
      template(v-if="attribute.type === 'ALLOCATABLE'")
        p {{ attribute.constraints['dynamic-type'].id }}
</template>

<script>

import { toDrilldownItems as categoryToDrilldownItem } from '@/types/Category'

export default {

  components: {

  },

  data() {
    return {
      attributes: []
    }
  },

  created() {
    this.attributes = JSON.parse(`[
  {
    "id": "a540c97d-d64d-440e-834c-fe0a07b5fb31",
    "key": "name",
    "name": "eventname",
    "type": "STRING",
    "constraints": {}
  },
  {
    "id": "a3964998-7207-4396-9fca-5eb34877a1f2",
    "key": "a1",
    "name": "Studiengang",
    "type": "CATEGORY",
    "constraints": {
      "root-category": {
        "id": "c77321ef-0c3e-428b-ba26-e63de31deb89",
        "key": "c1",
        "name": "Studiengang",
        "subcategories": [
          {
            "id": "c66b24b4-e470-45db-a176-f336eaed2da0",
            "key": "c1",
            "name": "Informatik",
            "subcategories": []
          },
          {
            "id": "c107a225-7a31-4472-b5e9-8abdc9b7dd50",
            "key": "c2",
            "name": "Mathematik",
            "subcategories": [
              {
                "id": "c101f6e3-4ded-47cc-b80c-0f4444dd6f8e",
                "key": "c1",
                "name": "Logik",
                "subcategories": []
              },
              {
                "id": "c559897c-edf6-4ab9-b7ca-e22af1e8d849",
                "key": "c2",
                "name": "Algebra",
                "subcategories": []
              },
              {
                "id": "c5c7f898-edf5-47a4-bbd2-b6df18509ba9",
                "key": "c3",
                "name": "Topologie",
                "subcategories": []
              },
              {
                "id": "c730ac9c-e495-4494-b8be-1b3493d6c2f1",
                "key": "c4",
                "name": "Analysis",
                "subcategories": []
              }
            ]
          }
        ]
      },
      "multi-select": false
    }
  },
  {
    "id": "aca76b37-d3fb-4b84-b0d6-d96dfebcc274",
    "key": "a2",
    "name": "Beschreibung",
    "type": "STRING",
    "constraints": {}
  },
  {
    "id": "a6c88358-748d-4e65-ad21-d6209e52bbda",
    "key": "a3",
    "name": "testNr",
    "type": "INT",
    "constraints": {}
  },
  {
    "id": "a3f39303-e53d-49c9-90b8-3c3db854e213",
    "key": "a4",
    "name": "testDate",
    "type": "DATE",
    "constraints": {}
  },
  {
    "id": "a6bfe01a-ed1f-49b5-8d25-5d5bfa7072b8",
    "key": "a5",
    "name": "testBool",
    "type": "BOOLEAN",
    "constraints": {}
  },
  {
    "id": "abd23c1f-7e90-4323-bbf7-43b15027d5f9",
    "key": "leader",
    "name": "Leiter",
    "type": "ALLOCATABLE",
    "constraints": {
      "dynamic-type": {
        "id": "d6e95bbb-2a7e-43bc-914a-d333830e1ba9",
        "key": "person",
        "name": "Person",
        "attributes": [
          {
            "id": "aec933e6-f04d-405d-a0bb-806c9c516a95",
            "key": "surname",
            "name": "surname",
            "type": "STRING",
            "constraints": {}
          },
          {
            "id": "a445d4d4-4921-4ff9-b645-32d1521b9e0d",
            "key": "firstname",
            "name": "First name",
            "type": "STRING",
            "constraints": {}
          },
          {
            "id": "a25c595e-50ee-4677-a025-baf424e836a0",
            "key": "email",
            "name": "Email",
            "type": "STRING",
            "constraints": {}
          }
        ]
      },
      "multi-select": false,
      "belongsTo": false,
      "package": false
    }
  }
  ]`)
  },

  methods: {
    drilldownCategories(attribute) {
      return attribute.constraints['root-category'].subcategories.map(categoryToDrilldownItem)
    }
  }

}
</script>


<style lang="scss" scoped>
  @import '../../../../assets/sass/bulma.scss';

  .drilldown {
    height: 12em;

    @include mobile {
      height: 24em;
    }
  }
</style>
