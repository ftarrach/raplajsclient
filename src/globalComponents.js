import BButton from '@/components/bulma/BButton'
import BDropdown from '@/components/bulma/BDropdown'
import BDropdownItem from '@/components/bulma/BDropdownItem'
import BDatepicker from '@/components/bulma/BDatepicker'
import BToggleButton from '@/components/bulma/BToggleButton'

const components = {
  BButton,
  BDropdown,
  BDropdownItem,
  BDatepicker,
  BToggleButton
}

const plugin = {
  install(Vue) {
    for (const compName in components) {
      const comp = components[compName]
      if (comp.name) {
        Vue.component(comp.name, comp)
      } else {
        console.warn(`Component ${comp} has no name`)
      }
    }
  }
}

export default plugin
