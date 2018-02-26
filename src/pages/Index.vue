<template lang="pug">
  div
    p &nbsp;
    .colmuns
      .column.is-one-fifth
        .flex.test
          b-drilldown(:items="items")
            p(slot="item" slot-scope="{ item }")
              | {{ item.label }}
            p(slot="container" slot-scope="{ item }")
              | {{ item.label }}
              fa-icon(icon="fa-caret-right" pull-right)
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },

  created() {
    this.items = [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
      { id: 3, label: 'Item 3' },
      { id: 4, label: 'Item 4' },
      { id: 5, label: 'Item 5' },
      { id: 6, label: 'Item 6' },
      { id: 7, label: 'Item 7' },
      { id: 8, label: 'Item 8' },
      { id: 9, label: 'I have children', children: [{ id: 10, label: 'Item 10' }] },
      { id: 10, label: 'Item 10' },
      { id: 11, label: 'Item 11' },
      { id: 12, label: 'Item 12' },
      { id: 13, label: 'Item 13' },
      { id: 14, label: 'Item 14' },
      { id: 15, label: 'Item 15' },
      { id: 16, label: 'Item 16' },
      { id: 17, label: 'Item 17' },
      { id: 18, label: 'Item 18' },
      { id: 19, label: 'Item 19' },
      { id: 20, label: 'Item 20' }
    ]
  }
}
</script>

<style scoped>
  .test {
    display: flex;
    height: 10em;
  }
</style>
