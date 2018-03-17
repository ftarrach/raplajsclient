<template lang="pug">
  span
      span(v-for='(item, index) in list' :key="index")
        | {{ item.replace(/ /g, '&nbsp;') }}
        template(v-if='index < list.length-1')
          | #[span , ]
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