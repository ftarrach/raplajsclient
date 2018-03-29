import BButton from '@/ui/BButton'
import BDateTimepicker from '@/ui/BDateTimepicker'
import BDropdown from '@/ui/BDropdown'
import BDropdownItem from '@/ui/BDropdownItem'
import BDatepicker from '@/ui/BDatepicker'
import BFab from '@/ui/BFab'
import BToggleButton from '@/ui/BToggleButton'
import BSteps from '@/ui/BSteps'
import BDrilldown from '@/ui/BDrilldown'
import BDrilldownItem from '@/ui/BDrilldownItem'
import BDrilldownContainer from '@/ui/BDrilldownContainer'
import BSpinner from '@/ui/BSpinner'
import BTimepicker from '@/ui/BTimepicker'
import FaIcon from '@/ui/FaIcon'
import BLabel from '@/ui/BLabel'
import VerticalFlex from '@/ui/VerticalFlex'

const components = {
  BButton,
  BDateTimepicker,
  BDropdown,
  BDropdownItem,
  BDatepicker,
  BFab,
  BToggleButton,
  BSteps,
  BDrilldown,
  BDrilldownItem,
  BDrilldownContainer,
  BSpinner,
  BTimepicker,
  FaIcon,
  BLabel,
  VerticalFlex
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
