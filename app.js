'use strict'

const elBudget = document.getElementById('budget'),
  elExpenses = document.getElementById('addExpenses'),
  elTotal = document.getElementById('total'),
  elLeft = document.getElementById('left'),
  elItems = document.getElementById('items'),
  elItemValues = document.getElementById('itemValue'),
  fragmentItems = document.createDocumentFragment(),
  fragmentItemValues = document.createDocumentFragment()

let budget,
  budgetLeft,
  hasBudget = false

eventListner()
function eventListner() {
  elBudget.addEventListener('submit', getBudget)
  elExpenses.addEventListener('submit', getExpenses)
}

function getBudget(e) {
  e.preventDefault()

  const elBudgetVal = this.querySelector('.budget-input')

  if (isNaN(elBudgetVal.value)) {
    errMessage('Please insert a valid input', 'alert-danger')
  } else if (elBudgetVal.value.length > 0) {
    budget = Number(elBudgetVal.value)
    budgetLeft = budget

    if (budget) {
      errMessage('Monthly budget added', 'alert-success')
    }

    elBudget.parentElement.firstElementChild.remove()
    elBudget.remove()
    renderBudget()
  } else {
    errMessage('Please provide your budget', 'alert-danger')
  }

  this.reset()
}

function getExpenses(e) {
  hasBudget = true
  e.preventDefault()

  const crtElItem = document.createElement('li')
  const crtElItemValues = document.createElement('li')

  const expenseItem = this.querySelector('.expenseItem')
  let amount = this.querySelector('.amount')
  budgetLeft = budgetLeft - amount.value

  if (budget === undefined) {
    errMessage('Please input your budget first', 'alert-danger')
  } else {
    if (budgetLeft < 0) {
      budgetLeft = 0
      errMessage('Your out of budget', 'alert-danger')

      console.log(budgetLeft)
    } else {
      if (expenseItem.value.length > 0 && !isNaN(amount.value) && amount.value.length > 0) {
        crtElItem.textContent = expenseItem.value
        crtElItemValues.textContent = amount.value

        fragmentItems.appendChild(crtElItem)
        fragmentItemValues.appendChild(crtElItemValues)

        elItems.appendChild(fragmentItems)
        elItemValues.appendChild(fragmentItemValues)

        errMessage(`${expenseItem.value} added`, 'alert-success')
        // console.log('both have input')

        renderBudget()
      } else if (expenseItem.value.length === 0) {
        console.log('Please provide item name')
        errMessage('Please provide item name', 'alert-danger')
      } else if (amount.value.length === 0) {
        console.log('Please provide item amount')
        errMessage('Please provide item amount', 'alert-danger')
      } else if (isNaN(amount.value)) {
        errMessage('Please provide valid item amount', 'alert-danger')
        console.log('Please provide valid item amount')
      }
    }
  }
  hasBudget = false

  this.reset()
}

function renderBudget() {
  elTotal.textContent = budget
  elLeft.textContent = budgetLeft
}

function errMessage(msg, cls) {
  const pEl = document.createElement('p')
  let parentDiv = hasBudget ? elExpenses : elBudget

  const parentDivChild = parentDiv.firstElementChild
  pEl.textContent = msg
  pEl.classList = `alert ${cls}`

  parentDiv.insertBefore(pEl, parentDivChild)
  setTimeout(() => {
    pEl.remove()
  }, 1500)
}
