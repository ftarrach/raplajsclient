export default class {
  constructor({ id, title, component, props, actions, onClose }) {
    this.id = id
    this.title = title
    this.component = component
    this.props = props
    this.actions = actions
    this.onClose = onClose
  }
}
