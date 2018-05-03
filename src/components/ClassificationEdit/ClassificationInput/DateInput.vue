<template lang="pug">
  dialog-date-picker(
    v-model="val"
  )
</template>

<script>
import DateTime from '@/types/DateTime'
import DialogDatePicker from '@/ui//DialogDatePicker'

export default {
  components: {
    DialogDatePicker
  },

  props: {
    value: {
      type: DateTime,
      required: false
    },

    name: {
      type: String,
      required: true
    }
  },

  computed: {
    val: {
      get() {
        if (this.value) {
          return this.value.date
        }
        return null
      },
      set(newVal) {
        if (newVal) {
          const time = this.value ? this.value.time : '00:00:00'
          this.$emit('input', {
            type: 'DATE',
            name: this.name,
            newVal: new DateTime(newVal, time)
          })
        } else {
          this.$emit('input', {
            type: 'DATE',
            name: this.name,
            newVal: null
          })
        }
      }
    }
  }
}
</script>
