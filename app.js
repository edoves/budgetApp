'use strict'

const budgetForm = document.getElementById('budget')
const expensesForm = document.getElementById('add-expenses')

let budgetAmount
let budgetLeft

eventListener()
function eventListener() {
  budgetForm.addEventListener('submit', submitBudget)
  expensesForm.addEventListener('submit', afterExpense)
}

function submitBudget(e) {
  e.preventDefault()
  budgetAmount = this.querySelector('#budget-input').value
  budgetAmount = Number(budgetAmount)
  uiRenderBudget()
  this.reset()
}

function afterExpense(e) {
  e.preventDefault()
  let amount = this.querySelector('#amount').value
  amount = Number(amount)
  uiRerenderBudgetLeft(amount)
  this.reset()
}

function uiRenderBudget() {
  const total = document.getElementById('total')
  const left = document.getElementById('left')

  total.textContent = budgetAmount
  left.textContent = budgetAmount
}

function uiRerenderBudgetLeft(amount) {
  const left = document.getElementById('left')
  budgetAmount = budgetAmount - amount
  if (budgetAmount < 0) return budgetAmount
  left.textContent = budgetAmount
}
