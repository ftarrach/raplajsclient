import Vue from 'vue'

const createDynamic = (content) => {
  const name = content.name()
  if (name === 'BLabel') {
    const ComponentClass = Vue.extend(Vue.component(name))
    const it = new ComponentClass({
      propsData: { text: content.getText() }
    })
    it.$mount()
    console.log(it)
    return it
  }
}

export { createDynamic }
