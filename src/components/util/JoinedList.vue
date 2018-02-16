<template lang="pug">
  span
    template(v-for='(item, index) in list')
      | {{ item.replace(/ /g, '&nbsp;') }}
      template(v-if='index < list.length-1')
        |, 
</template>

<script>
export default {
  props: {
    list: {
      required: true
    }
  }
}
</script>