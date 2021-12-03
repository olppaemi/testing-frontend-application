const { addItem, data } = require('../src/inventoryController')

describe('addItem', () => {
  test('adding new items to the inventory', () => {
    data.inventory = {}
    addItem('cheesecake', 5)
    expect(data.inventory.cheesecake).toBe(5)
  })
})
