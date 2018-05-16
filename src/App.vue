<template lang="pug">
  v-app
    v-navigation-drawer.drawer(
      persistent
      clipped
      v-model='showResourceTree'
      enable-resize-watcher
      fixed
      app
      v-resize="onResize"
    )
      v-layout(column).nav
        v-flex(xs8)
          main-resource-tree(
            v-model="selectedResources"
            :items="resources"
          )
        v-flex(xs4)
          tree-view(
            :items="conflicts"
          ).conflict-tree.pa-3
    the-toolbar(
      :calendars="calendars"
      :current-calendar="currentCalendar"
      :views="views"
      :currentView="currentView"
      @hamburgerClick="toggleResourceTree"
      @calendarChosen="setCalendar"
      @viewChosen="setView"
    )
    v-content
      main-view(:view-id="currentView")
      window-manager(ref="windowManager")
      dynamic-dialog
    error-dialog
</template>

<script>
import demodata from './Appdemodata'
import MainResourceTree from './components/MainResourceTree/MainResourceTree'
import TheToolbar from './components/MainToolbar/TheToolbar'
import ErrorDialog from './components/ErrorDialog/ErrorDialog'
import MainView from './pages/MainView'
import DynamicDialog from './components/DynamicDialog/DynamicDialog'
import WindowManager from './components/WindowManager/WindowManager'
import TreeView from './components/TreeView/TreeView'
import TreeViewGwt from './components/TreeView/parseGwt'
import EventBus from '@/EventBus'

export default {
  name: 'App',

  components: {
    MainResourceTree,
    TheToolbar,
    ErrorDialog,
    MainView,
    DynamicDialog,
    WindowManager,
    TreeView
  },

  data() {
    return {
      showResourceTree: false,

      currentView: 'table_events',

      currentCalendar: '',
      calendars: [],

      views: [],

      selectedResources: [],
      resources: [],

      conflicts: []
    }
  },

  created() {
    if (window.api) {
      this.currentView = window.api.calendarModel.getViewId()
      this.calendars = [
        { id: null, label: 'Default' },
        ...window.api.getCalendarNames().map(c => ({ id: c, label: c }))
      ]
      this.views = window.api.getViews()
      this.setView('table_events')
    } else {
      this.resources = demodata.resources
      this.calendars = demodata.calendars
      this.views = demodata.views
      this.conflicts = demodata.conflicts
      this.setView('week')
    }

    EventBus.$on('gwt-debug', obj => console.log(`gwt-debug: ${obj}`))

    EventBus.$on('gwt-init', this.gwtInit)

    EventBus.$on('update-main-conflicts', (conflicts) => {
      this.conflicts = TreeViewGwt.parseChildren(conflicts.children())
    })
  },

  methods: {
    toggleResourceTree() {
      this.showResourceTree = !this.showResourceTree
    },

    setCalendar(calendarId) {
      this.currentCalendar = calendarId
      if (window.api) {
        window.api.calendarModel.load(calendarId)
      }
    },

    setView(viewId) {
      this.currentView = viewId
      if (window.api) {
        window.api.calendarModel.setViewId(viewId)
      }
    },

    onResize() {
      // Keep ResourceTree open if the viewport is »large« or bigger
      if (this.$vuetify.breakpoint.lgAndUp) {
        this.showResourceTree = true
      }
    },

    gwtInit(options) {
      document.title = options.windowTitle
    },

    hasWindow(windowId) {
      return this.$refs.windowManager.hasWindow(windowId)
    }
  }
}
</script>

<style lang="stylus" scoped>
.drawer
  padding 0

.nav
  height 100%

  > *
    width 100%
    overflow auto

.conflict-tree
  border-top 1px solid #e0e0e0
</style>
