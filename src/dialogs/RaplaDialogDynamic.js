import Vue from 'vue'
import BLabel from '@/ui/BLabel'

const renderChildren = (children, createElement) => {
  return children.map(g => renderDynamicComponent(g, createElement))
}

const renderDynamicComponent = (gwtVueComponent, createElement) => {
  const component = Vue.component(gwtVueComponent.name())
  switch (gwtVueComponent.name()) {
    case 'BLabel':
      return createElement(component, {
        props: {
          text: gwtVueComponent.text(),
          color: gwtVueComponent.color()
        }
      })
    case 'VerticalFlex':
      return createElement(component, {
        scopedSlots: {
          default(props) {
            return renderChildren(gwtVueComponent.children(), createElement)
          }
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
