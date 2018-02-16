export default {
  computed: {
    startTime: {
      get() { return this.value.time ? this.value.time.from : '' },
      set(newVal) { this.value.time.from = newVal }
    },
    endTime: {
      get() { return this.value.time ? this.value.time.to : '' },
      set(newVal) { this.value.time.to = newVal }
    },
    wholeDay: {
      get() {
        return this.value.time === null
      },
      set(newVal) {
        if (newVal) {
          this.savedTime = this.value.time
          this.value.time = null
        } else {
          if (this.savedTime) {
            this.value.time = this.savedTime
          } else {
            this.value.time = {
              from: '08:00',
              to: '18:00',
              endtype: 'same-day'
            }
          }
        }
      }
    }
  }
}
