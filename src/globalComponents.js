import BButton from '@/ui/BButton'
import BDropdown from '@/ui/BDropdown'
import BDropdownItem from '@/ui/BDropdownItem'
import BDatepicker from '@/ui/BDatepicker'
import BToggleButton from '@/ui/BToggleButton'
import BSteps from '@/ui/BSteps'

const components = {
  BButton,
  BDropdown,
  BDropdownItem,
  BDatepicker,
  BToggleButton,
  BSteps
}

const plugin = {
  install(Vue) {
    console.log('installing global Vue Components')
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
