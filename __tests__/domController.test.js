const fs = require('fs')
const { updateItemList, handleAddItem } = require('../src/domController')
const { getByText, screen } = require('@testing-library/dom')

const initialHtml = fs.readFileSync('./public/index.html')

beforeEach(() => {
  document.body.innerHTML = initialHtml
})

describe('updateItemList', () => {
  beforeAll(() => localStorage.clear())

  test('updates the DOM with the inventory items', () => {
    const inventory = {
      cheesecake: 5,
      'apple pie': 2,
      'carrot cake': 6,
    }
    updateItemList(inventory)

    const itemList = document.getElementById('item-list')
    expect(itemList.childNodes).toHaveLength(3)

    expect(getByText(itemList, 'cheesecake - Quantity: 5')).toBeInTheDocument()
    expect(getByText(itemList, 'apple pie - Quantity: 2')).toBeInTheDocument()
    expect(getByText(itemList, 'carrot cake - Quantity: 6')).toBeInTheDocument()
  })

  test('adding a paragraph indication what was the update', () => {
    const inventory = { cheesecake: 5, 'apple pie': 2 }
    updateItemList(inventory)

    expect(
      screen.getByText(
        `The inventory has been updated - ${JSON.stringify(inventory)}`
      )
    ).toBeInTheDocument()
  })

  test('highlightening in red elements whose quantity is below five', () => {
    const inventory = { cheesecake: 5, 'apple pie': 2, 'carrot cake': 6 }
    updateItemList(inventory)

    expect(screen.getByText('apple pie - Quantity: 2')).toHaveStyle({
      color: 'red',
    })
  })

  test('updates the localStorage with the inventory', () => {
    const inventory = { cheesecake: 5, 'apple pie': 2 }
    updateItemList(inventory)

    expect(localStorage.getItem('inventory')).toEqual(JSON.stringify(inventory))
  })
})

describe('handleAddItem', () => {
  test('adding items to the page', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        elements: {
          name: { value: 'cheesecake' },
          quantity: { value: '6' },
        },
      },
    }
    handleAddItem(event)
    expect(event.preventDefault.mock.calls).toHaveLength(1)

    const itemList = document.getElementById('item-list')
    expect(getByText(itemList, 'cheesecake - Quantity: 6')).toBeInTheDocument()
  })
})
