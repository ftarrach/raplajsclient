import Vue from 'vue'
import BLabel from '@/ui/BLabel'

const renderChildren = (children, createElement) => {
  return children.map(g => renderDynamicComponent(g, createElement))
}

const renderDynamicComponent = (gwtVueComponent, createElement) => {
  const component = Vue.component(gwtVueComponent.name())
  switch (gwtVueComponent.name()) {
    case 'BLabel':
      console.log(gwtVueComponent)
      return createElement(component, {props: gwtVueComponent})
    case 'VerticalFlex':
    case 'HorizontalFlex':
      return createElement(component, {
        scopedSlots: {
          default(props) {
            return renderChildren(gwtVueComponent.children(), createElement)
          }
        }
      })
    case 'BList':
      let it = gwtVueComponent.getItems().map(i => ({ id: i.getId(), label: i.getLabel() }))
      return createElement(component, {
        props: {
          items: it,
          value: []
        }
      })
  }
  return component
}

const RaplaDialogDynamic = {
  name: 'RaplaDialogDynamic',

  data() {
    return {
      error: null,
      gwtComponent: null
    }
  },

  render(createElement) {
    console.log('rerendering DialogDynamic')
    if (this.error) {
      return createElement(BLabel, {
        props: {
          text: this.error,
          color: 'has-text-danger'
        }
      })
    }
    if (this.gwtComponent) {
      return renderDynamicComponent(this.gwtComponent, createElement)
    }
    return createElement('p')
  },

  methods: {
    initialize(gwtVueComponent) {
      console.log(`initialising dynamic dialog...`)
      console.log(gwtVueComponent)
      try {
        this.gwtComponent = Object.freeze(gwtVueComponent)
      } catch (e) {
        console.error(e)
        this.error = e.message
      }
    }
  }
}

export default RaplaDialogDynamic
