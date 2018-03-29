import Vue from 'vue'
import BLabel from '@/ui/BLabel'

const renderDynamicComponent = (gwtVueComponent, createElement) => {
  console.log(`uiae ${gwtVueComponent.name()}`)
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
            return gwtVueComponent.children().map(g => renderDynamicComponent(g, createElement))
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
      console.log('gwt:')
      console.log(this.gwtComponent)
      let root = renderDynamicComponent(this.gwtComponent, createElement)
      console.log(root)
      return root
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
