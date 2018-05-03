const parseChildren = items => {
  const result = []
  for (const i of items) {
    let children = i.children()
    let childItems = []
    if (children.length > 0) {
      childItems = parseChildren(children)
    }
    result.push({
      title: i.label,
      items: childItems
    })
  }
  return result
}

const parseObject = item => ({
  title: item.label,
  items: parseChildren(item.children())
})

export default {
  parseChildren,
  parseObject
}
