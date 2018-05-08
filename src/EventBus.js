import Vue from 'vue'

const EventBus = new Vue({
  methods: {
    hasWindow(windowId) {
      return window.raplaClient.hasWindow(windowId)
    }
  }
})

export default EventBus
