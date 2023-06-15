'use strict'

const elBudget = document.getElementById('budget'),
  elExpenses = document.getElementById('addExpenses'),
  elTotal = document.getElementById('total'),
  elLeft = document.getElementById('left'),
  elItems = document.getElementById('items'),
  elItemValues = document.getElementById('itemValue'),
  fragmentItems = document.createDocumentFragment(),
  fragmentItemValues = document.createDocumentFragment()

let budget, budgetLeft

eventListner()
function eventListner() {
  elBudget.addEventListener('submit', getBudget)
  elExpenses.addEventListener('submit', getExpenses)
}

function getBudget(e) {
  e.preventDefault()

  const elBudgetVal = this.querySelector('.budget-input')
  budget = Number(elBudgetVal.value)
  budgetLeft = budget
  renderBudget()
  this.reset()
}

function getExpenses(e) {
  e.preventDefault()

  const crtElItem = document.createElement('li')
  const crtElItemValues = document.createElement('li')

  const expenseItem = this.querySelector('.expenseItem')
  let amount = this.querySelector('.amount')
  budgetLeft = budgetLeft - amount.value

  crtElItem.textContent = expenseItem.value
  crtElItemValues.textContent = amount.value

  fragmentItems.appendChild(crtElItem)
  fragmentItemValues.appendChild(crtElItemValues)

  elItems.appendChild(fragmentItems)
  elItemValues.appendChild(fragmentItemValues)

  renderBudget()
  this.reset()
}

function renderBudget() {
  elTotal.textContent = budget
  elLeft.textContent = budgetLeft
}
