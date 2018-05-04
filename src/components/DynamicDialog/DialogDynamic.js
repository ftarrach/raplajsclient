import TreeView from '@/components/TreeView/TreeView'
import TreeViewParseHelper from '@/components/TreeView/parseGwt'
import VueLayout from '@/gwtinterop/VueLayout'

const renderChildren = (children, createElement) => {
  return children.map(g => renderDynamicComponent(g, createElement))
}

const renderDynamicComponent = (gwtVueComponent, createElement) => {
  const name = gwtVueComponent.name().toLowerCase()
  switch (name) {
    case 'vue-label':
      return createElement('p', gwtVueComponent.text)
    case 'vue-tree':
      return createElement(TreeView, {
        props: {
          items: TreeViewParseHelper.parseChildren(
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
    // case 'BButton':
    //   return createElement(component, {
    //     props: gwtVueComponent,
    //     on: {
    //       click: () => gwtVueComponent.onSelect()
    //     }
    //   })
    // case 'VerticalFlex':
    // case 'HorizontalFlex':
    //   return createElement(component, {
    //     scopedSlots: {
    //       default(props) {
    //         return renderChildren(gwtVueComponent.children(), createElement)
    //       }
    //     }
    //   })
    // case 'BList':
    //   let it = gwtVueComponent.getItems().map(i => ({ id: i.getId(), label: i.getLabel() }))
    //   return createElement(component, {
    //     props: {
    //       items: it,
    //       value: []
    //     }
    //   })
    default:
      return createElement('p', `unknown element ${name}`)
  }
}

export default {
  name: 'DialogDynamic',

  data() {
    return {
      error: null,
      gwtComponent: null
    }
  },

  render(createElement) {
    if (this.error) {
      return createElement('p', this.error)
    }
    if (this.gwtComponent) {
      return renderDynamicComponent(this.gwtComponent, createElement)
    }
    return createElement('p')
  },

  methods: {
    initialize(gwtVueComponent) {
      console.log(`initialising dynamic dialog...`)
      try {
        this.gwtComponent = Object.freeze(gwtVueComponent)
      } catch (e) {
        console.error(e)
        this.error = e.message
      }
    }
  }
}
