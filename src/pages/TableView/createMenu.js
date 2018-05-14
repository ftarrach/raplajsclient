import { icons } from '@/gwtinterop/icons'

const createMenu = (gwtObjects, selectedIds, focusedGwtObject) => {
  if (window.api) {
    const context = new window.org.rapla.client.menu.SelectionMenuContext(
      focusedGwtObject,
      null // popupcontext
    )
    context.setSelectedObjects(
      window.api.asSet(
        selectedIds.map(id => gwtObjects.find(r => r.getId() === id))
      )
    )
    const menu = new window.org.rapla.client.menu.gwt.VueMenu()
    window.api.menuFactory.addEventMenu(
      menu,
      context,
      null, // afterId
      () => {},
      () => {}
    )
    const menuItems = createMenuItemsFor(menu)
    return {
      title: menu.getTitle(),
      menuItems,
      gwtMenu: menu
    }
  } else {
    // DEBUG: demodata
    return {
      menuTitle: 'Selektierung',
      menuItems: [
        {
          id: 'New',
          icon: 'create',
          label: 'New',
          items: [
            {
              id: 'Event',
              label: 'Event',
              action: () => alert('click on event')
            },
            {
              id: 'Vorlesung',
              label: 'Vorlesung',
              action: () => alert('click on vorlesung')
            }
          ]
        },
        {
          id: 'Auswahl löschen',
          label: 'Auswahl löschen'
        },
        {
          id: 'Bearbeiten',
          label: 'Bearbeiten'
        },
        {
          id: 'Besitzer ändern',
          label: 'Besitzer ändern'
        }
      ],
      gwtMenu: []
    }
  }
}

const createMenuItemsFor = gwtMenu => {
  return gwtMenu.getItems().map(i => {
    const id = i.getId()
    if (i.getItems) {
      return {
        label: i.getLabel(),
        icon: icons[i.getIcon()],
        items: createMenuItemsFor(i)
      }
    } else if (id.startsWith('SEPERATOR-')) {
      return {
        seperator: true
      }
    } else {
      return {
        id,
        label: i.getLabel(),
        icon: icons[i.getIcon()],
        action: () => (i.onSelect ? i.onSelect() : {})
      }
    }
  })
}

export default createMenu
