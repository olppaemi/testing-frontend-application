const fs = require('fs')
const { screen, getByText } = require('@testing-library/dom')

const initialHtml = fs.readFileSync('./public/index.html')

beforeEach(() => {
  document.body.innerHTML = initialHtml
  jest.resetModules()
  require('../src/main')
})

test('adding item through the form', () => {
  screen.getByPlaceholderText('Item name').value = 'cheesecake'
  screen.getByPlaceholderText('Quantity').value = '6'

  const event = new Event('submit')
  const form = document.getElementById('add-item-form')
  form.dispatchEvent(event)

  const itemList = document.getElementById('item-list')
  expect(getByText(itemList, 'cheesecake - Quantity: 6')).toBeInTheDocument()
})

describe('item name validation', () => {
  test('entering valid item names', () => {
    const itemField = screen.getByPlaceholderText('Item name')
    itemField.value = 'cheesecake'
    const inputEvent = new Event('input')
    itemField.dispatchEvent(inputEvent)

    expect(screen.getByText('cheesecake is valid!')).toBeInTheDocument()
  })
})
