<template lang="pug">
  p {{ text }}
</template>

<script>
export default {

  name: 'BLabel',

  props: {
    text: {
      type: String,
      required: true
    }
  }

}
</script>
