import BButton from '@/ui/BButton'
import BDateTimepicker from '@/ui/BDateTimepicker'
import BDatepicker from '@/ui/BDatepicker'
import BFab from '@/ui/BFab'
import BFabMenu from '@/ui/BFabMenu'
import BToggleButton from '@/ui/BToggleButton'
import BSteps from '@/ui/BSteps'
import BDrilldown from '@/ui/BDrilldown'
import BDrilldownItem from '@/ui/BDrilldownItem'
import BDrilldownContainer from '@/ui/BDrilldownContainer'
import BDrilldownMenuItem from '@/ui/BDrilldownMenuItem'
import BDrilldownMenuContainer from '@/ui/BDrilldownMenuContainer'
import BSpinner from '@/ui/BSpinner'
import BTimepicker from '@/ui/BTimepicker'
import FaIcon from '@/ui/FaIcon'
import BLabel from '@/ui/BLabel'
import BList from '@/ui/BList'
import BListItem from '@/ui/BListItem'
import VerticalFlex from '@/ui/VerticalFlex'
import HorizontalFlex from '@/ui/HorizontalFlex'

const components = {
  BButton,
  BDateTimepicker,
  BDatepicker,
  BFab,
  BFabMenu,
  BToggleButton,
  BSteps,
  BDrilldown,
  BDrilldownItem,
  BDrilldownContainer,
  BDrilldownMenuItem,
  BDrilldownMenuContainer,
  BList,
  BListItem,
  BSpinner,
  BTimepicker,
  FaIcon,
  BLabel,
  VerticalFlex,
  HorizontalFlex
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
