import TreeView from '@/components/TreeView/TreeView'
import TreeViewParser from '@/components/TreeView/parseGwt'
import VueLayout from '@/gwtinterop/VueLayout'

const renderDynamicComponent = (gwtVueComponent, createElement) => {
  const name = gwtVueComponent.name().toLowerCase()
  switch (name) {
    case 'vue-label':
      return createElement('p', gwtVueComponent.text)
    case 'vue-tree':
      return createElement(TreeView, {
        props: {
          items: TreeViewParser.parseChildren(
            gwtVueComponent.rootNode.children()
          )
        }
      })
    case 'vue-layout':
      return createElement(VueLayout, {
        props: gwtVueComponent,
        scopedSlots: {
          default: function(props) {
            return renderChildren(gwtVueComponent.children(), createElement)
          }
        }
      })
    default:
      return createElement('p', `unknown element ${name}`)
  }
}

export default {
  name: 'DialogDynamic',

  data() {
    return {
      gwtComponent: null
    }
  },

  render(createElement) {
    if (this.gwtComponent) {
      console.time('build component tree')
      const content = renderDynamicComponent(this.gwtComponent, createElement)
      console.timeEnd('build component tree')
      return content
    }
    return null
  },

  methods: {
    initialize(gwtVueComponent) {
      console.log(`initialising dynamic dialog...`)
      this.gwtComponent = gwtVueComponent
    }
  }
}

const renderChildren = (children, createElement) => {
  return children.map(g => renderDynamicComponent(g, createElement))
}
