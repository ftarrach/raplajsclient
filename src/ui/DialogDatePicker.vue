<template lang="pug">
  v-dialog(
    ref="dialog"
    v-model="dialog"
    lazy
    full-width
    width="290px"
    :return-value.sync="date"
  )
    v-text-field(
      slot="activator"
      v-model="formattedDate"
      :label="label"
      readonly
    )
    v-date-picker(
      v-model="date"
      scrollable
    )
      v-spacer
      v-btn(
        flat
        color="secondary"
        @click="emitNull"
      )
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },

    label: {
      type: String,
      required: false,
      default: null
    }
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    date: {
      get() {
        return this.value
      },
      set(newVal) {
        if (newVal !== this.date) {
          this.$emit('input', newVal)
          this.$refs.dialog.save(newVal)
        }
      }
    },

    formattedDate() {
      if (this.date) {
        const s = this.date.split('-')
        return `${s[2]}.${s[1]}.${s[0]}`
      }
      return ''
    }
  },

  methods: {
    emitNull() {
      this.$emit('input', null)
      this.$refs.dialog.save(null)
    }
  }
}
</script>
