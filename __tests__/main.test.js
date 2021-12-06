const fs = require('fs')
const { screen, getByText, fireEvent } = require('@testing-library/dom')

const initialHtml = fs.readFileSync('./public/index.html')

beforeEach(() => localStorage.clear())
beforeEach(() => {
  document.body.innerHTML = initialHtml
  jest.resetModules()
  require('../src/main')
})

test('persists items between sessions', () => {
  const itemField = screen.getByPlaceholderText('Item name')
  fireEvent.input(itemField, {
    target: { value: 'cheesecake' },
    bubbles: true,
  })

  const quantityField = screen.getByPlaceholderText('Quantity')
  fireEvent.input(quantityField, {
    target: { value: '6' },
    bubbles: true,
  })

  const submitBtn = screen.getByText('Add to inventory')
  fireEvent.click(submitBtn)

  const itemListBefore = document.getElementById('item-list')
  expect(itemListBefore.childNodes).toHaveLength(1)
  expect(
    getByText(itemListBefore, 'cheesecake - Quantity: 6')
  ).toBeInTheDocument()

  document.body.innerHTML = initialHtml
  jest.resetModules()
  require('../src/main')

  const itemListAfter = document.getElementById('item-list')
  expect(itemListAfter.childNodes).toHaveLength(1)
  expect(
    getByText(itemListAfter, 'cheesecake - Quantity: 6')
  ).toBeInTheDocument()
})

test('adding item through the form', () => {
  const itemField = screen.getByPlaceholderText('Item name')
  fireEvent.input(itemField, {
    target: { value: 'cheesecake' },
    bubbles: true,
  })

  const quantityField = screen.getByPlaceholderText('Quantity')
  fireEvent.input(quantityField, {
    target: { value: '6' },
    bubbles: true,
  })

  const submitBtn = screen.getByText('Add to inventory')
  fireEvent.click(submitBtn)

  const itemList = document.getElementById('item-list')
  expect(itemList.childNodes).toHaveLength(1)
  expect(getByText(itemList, 'cheesecake - Quantity: 6')).toBeInTheDocument()
})

describe('item name validation', () => {
  test('entering valid item names', () => {
    const itemField = screen.getByPlaceholderText('Item name')
    // itemField.value = 'cheesecake'
    // const inputEvent = new Event('input', { bubbles: true })
    // itemField.dispatchEvent(inputEvent)

    fireEvent.input(itemField, {
      target: { value: 'cheesecake' },
      bubbles: true,
    })

    expect(screen.getByText('cheesecake is valid!')).toBeInTheDocument()
  })
})
