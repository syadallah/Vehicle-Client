
// const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const getFormsFields = require('./../../../lib/get-form-fields')
const store = require('./../store')
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
  console.log('car data is: ', data)
  api.addToList(data)
    .then(ui.addToListSuccess)
    .catch(ui.addToListFailure)
}
// show all list of car costs and print it on screen
const onPrintList = function (event) {
  $('.content').show()
  event.preventDefault()
  api.printList()
    .then(ui.printListSuccess)
    .catch(ui.printListFailure)
}
// Handelbars
// Remove button for each car list using handelbars
const onDestroyCar = function (event) {
  event.preventDefault()
  const carId = $(event.target).closest('section').data('id')
  api.removeCar(carId)
    .then(() => onPrintList(event))
    .catch(ui.removeCarFailure)
}
const onUpdateCarSelect = (event) => {
  event.preventDefault()
  store.id = $(event.target).closest('section').data('id')
  console.log(store.id)
  $('#update-info').show()
  $('.content').hide()
}
const onUpdateCar = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormsFields(form)
  api.updateCar(data)
    .then(ui.updateCarSuccess)
    .catch(ui.updateCarFailure)
}
const addHandlers = function () {
  // Show forms after click on button on nav bar
  $('#signin').on('click', () => ui.signInShow())
  $('.change-pw-show').on('click', () => ui.changePasswordShow())
  $('#addcost').on('click', () => ui.carInfoShow())
  // $('.content').on('click', () => ui.carUpdateShow())
  $('.home').on('click', () => ui.clearCars())
  // or remove all cars at once using API.removeAllCars
  // submit after fill the forms
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
  $('#car-info').on('submit', onAddToList)
  // Handelbars
  $('#printlist').on('click', onPrintList)
  $('.content').on('click', '#destroyCar', onDestroyCar)
  $('.content').on('click', '#updateCar', onUpdateCarSelect)
  $('#update-info').on('submit', onUpdateCar)
}
module.exports = {
  addHandlers
}
