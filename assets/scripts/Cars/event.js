
// const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const getFormsFields = require('./../../../lib/get-form-fields')

// SignUP
const onSignUp = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormsFields(form)
  console.log(data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// SignIN
const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormsFields(form)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// changePassword
const onChangePassword = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormsFields(form)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
// signOUT
const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}
// create new car object with the cost keys
const onAddToList = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormsFields(form)
  api.addToList(data)
    .then(ui.addToListSuccess)
    .catch(ui.addToListFailure)
}

const onPrintList = function (event) {
  $('#bookshelf').show()
  event.preventDefault()
  api.printList()
    .then(ui.printListSuccess)
    .catch(ui.printListFailure)
}
// Handelbars

// const onClearCars = (event) => {
//   event.preventDefault()
//   ui.clearCars()
// }
// Remove button for each car list using handelbars
const onDestroyCar = (event) => {
  event.preventDefault()
  const carId = $(event.target).closest('section').data('id')
  api.removeCar(carId)
    .then(() => onPrintList(event))
    .catch(ui.removeCarFailure)
}
const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)

  // Show forms after click on button on nav bar
  $('#signin').on('click', () => ui.signInShow())
  $('.change-pw-show').on('click', () => ui.changePasswordShow())
  $('#addcost').on('click', () => ui.carInfoShow())

  // Handelbars

  $('.add-to-list').on('submit', onAddToList)
  $('#printlist').on('click', onPrintList)
  $('.content').on('click', '#destroyCar', onDestroyCar)
}
module.exports = {
  addHandlers
}
