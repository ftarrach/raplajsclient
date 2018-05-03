<template lang="pug">
  v-dialog(ref="dialog" v-model="modal" lazy full-width width="290px" :return-value.sync="date")
    v-text-field(slot="activator" v-model="formattedDate" :label="label" readonly)
    v-date-picker(v-model="date" scrollable)
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: null
    }
  },

  computed: {
    date: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
        this.$refs.dialog.save(newVal)
      }
    },

    formattedDate() {
      // TODO: to gwt
      let s = this.date.split('-')
      return `${s[2]}.${s[1]}.${s[0]}`
    }
  },

  data() {
    return {
      modal: false,
      cancel: 'Cancel',
      ok: 'OK'
    }
  }
}
</script>
