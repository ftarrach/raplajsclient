<template lang="pug">
  v-dialog(
    v-model="dialog"
    lazy full-width
    width="290px"
    :disabled="disabled"
    :return-value.sync="time"
  )
    v-text-field(
      slot="activator"
      v-model="formattedTime"
      :label="label"
      :disabled="disabled"
      readonly
    )
    v-time-picker(
      v-model="time"
      :format="format"
      scrollable
    )
      v-layout
        v-flex(xs6)
          v-btn(block flat color="primary" @click="dialog = false")
            | {{ "cancel" | localize }}
        v-flex(xs6)
          v-btn(block flat color="primary" @click="close()")
            | {{ "ok" | localize }}
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
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    time: {
      get() {
        return this.tmpTime ? this.tmpTime : this.value
      },
      set(newVal) {
        this.tmpTime = newVal
      }
    },

    formattedTime() {
      // TODO: to gwt
      let s = this.time.split(':')
      return `${s[0]}:${s[1]}`
    },

    format() {
      return this.twentyfour ? '24hr' : '12hr'
    }
  },

  data() {
    return {
      dialog: false,
      twentyfour: true,
      tmpTime: null
    }
  },

  methods: {
    close() {
      this.$refs.dialog.save(this.time)
      this.$emit('input', this.time)
      this.tmpTime = null
    }
  }
}
</script>
