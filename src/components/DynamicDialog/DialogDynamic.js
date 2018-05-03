import TreeView from '@/components/TreeView/TreeView'
import TreeViewParseHelper from '@/components/TreeView/parseGwt'

// const renderChildren = (children, createElement) => {
//   return children.map(g => renderDynamicComponent(g, createElement))
// }

const renderDynamicComponent = (gwtVueComponent, createElement) => {
  const name = gwtVueComponent.name().toLowerCase()
  console.log('renderDynamicComponent')
  switch (name) {
    case 'v-label':
      return createElement('p', gwtVueComponent.text)
    case 'rapla-tree':
      return createElement(TreeView, {
        props: {
          items: TreeViewParseHelper.parseChildren(gwtVueComponent.rootNode.children())
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
    console.log('rerendering DialogDynamic')
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
