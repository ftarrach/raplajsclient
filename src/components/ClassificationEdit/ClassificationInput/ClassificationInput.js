import StringInput from './StringInput'
import BooleanInput from './BooleanInput'
import NumberInput from './NumberInput'
import DateInput from './DateInput'
import CategoryInput from './CategoryInput'
import AllocatableInput from './AllocatableInput'

function appropriateInputComponent(attribute) {
  switch (attribute.type) {
    case 'STRING':
      return StringInput
    case 'BOOLEAN':
      return BooleanInput
    case 'INT':
      return NumberInput
    case 'DATE':
      return DateInput
    case 'CATEGORY':
      return CategoryInput
    case 'ALLOCATABLE':
      return AllocatableInput
  }
  return null
}

export default {
  name: 'classification-input',

  functional: true,

  props: {
    attribute: {
      type: Object,
      required: true
    },
    constraints: {},
    annotations: {}
  },

  render: function(createElement, context) {
    return createElement(
      appropriateInputComponent(context.props.attribute),
      {
        attrs: Object.assign({}, context.props, context.data.attrs),
        on: context.listeners
      }
    )
  }
}
