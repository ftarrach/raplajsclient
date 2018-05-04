const categories = [
  {
    id: '123',
    label: 'Demo Category',
    items: [
      {
        id: '456',
        label: 'Demo Subcategory',
        items: []
      },
      {
        id: '345',
        label: 'Demo Subcategory 2',
        items: []
      }
    ]
  },
  {
    id: '789',
    label: 'Demo Category 2',
    items: [
      {
        id: '100',
        label: 'Demo Category 2 Sub',
        items: [
          {
            id: '101',
            label: 'Level 3 Subcategory',
            items: []
          }
        ]
      }
    ]
  }
]

export default {
  categories
}
