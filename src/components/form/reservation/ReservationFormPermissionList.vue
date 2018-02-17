<template lang="pug">
  include ../../widgets/SingleMultiSelect.pug
    block option
      option(value="0") Group See Events of other Users
      option User fabian
      option All users
</template>

<script>

import SingleMultiSelect from '@/components/widgets/SingleMultiSelect'

export default {
  extends: SingleMultiSelect,

  props: {
    value: {
      type: [String, Number], // id of selected permission
      required: true
    }
  }
}
</script>

