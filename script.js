'use strict'

// alert-warning
// alert-danger

const budgetForm = document.getElementById('budget')
const expenseForm = document.getElementById('addExpenses')
const totalBudget = document.getElementById('total')
const leftBudget = document.getElementById('left')

let monthlyBudget
let budgetLeft

eventListner()
function eventListner() {
  budgetForm.addEventListener('submit', submitBudget)
  expenseForm.addEventListener('submit', afterExpense)
}

function submitBudget(e) {
  e.preventDefault()
  monthlyBudget = this.querySelector('#budget-input').value
  monthlyBudget = Number(monthlyBudget)
  budgetLeft = monthlyBudget

  if (isNaN(monthlyBudget)) {
    errMassage('Please provide a valid input preferably a number', 'alert-danger')
  } else if (this.querySelector('#budget-input').value === '') {
    errMassage('The input is empty try again', 'alert-danger')
  } else {
    uiRenderBudget()
    this.reset()
  }
}

function afterExpense(e) {
  e.preventDefault()
  let amount = this.querySelector('#amount').value
  amount = Number(amount)

  uiRerenderBudgetLeft(amount)
  this.reset()
}

function uiRenderBudget() {
  totalBudget.textContent = monthlyBudget
  leftBudget.textContent = budgetLeft
}

function uiRerenderBudgetLeft(amount) {
  budgetLeft -= amount
  if (budgetLeft < 0) return budgetLeft
  uiRenderBudget()
}

function errMassage(msg, cls) {
  console.log(msg, cls)
}
