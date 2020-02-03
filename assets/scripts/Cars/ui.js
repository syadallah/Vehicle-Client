'use strict'
const store = require('./../store')
const api = require('./api')
const showCarsHB = require('./../templates/car-listing.handlebars')

// sign up
const signUpSuccess = function (response) {
  $('#sign-up')[0].reset()
}

// sign in
const signInSuccess = function (response) {
  store.user = response.user
  console.log(response)
  $('.after-auth').show()
  $('.before-auth, #signin, #change-password, #car-info, #update-info').hide()
}

// Change password
const changePasswordSuccess = function (response) {
  store.user = response.user
  $('.after-auth').show()
  $('.before-auth, #signin').hide()
}

const changePasswordFailure = function () {
  console.log('error')
}

// sign out
const signOutSuccess = function (response) {
  $('#sign-in, #sign-up, #change-password')[0].reset()
  $('h1, p, #signin').show()
  $('.after-auth, .before-auth').hide()
}
const signOutFailure = function () {
  console.log('error')
}

// const carInfoSuccess = function (response) {
//   $('#car-info')[0].reset()
//   console.log(response)
//   store.car = response.car
// }

// Show forms after click on button on nav bar
const signInShow = function () {
  $('.before-auth').show()
  $('h1, p').hide()
}
const changePasswordShow = function () {
  $('#change-password').show()
}
const carInfoShow = function () {
  $('#car-info').show()
}

// Add costs to list form and store data
const addToListSuccess = function (response) {
  console.log(response)
  store.car = response.car
  $('#car-info')[0].reset()
  $('.after-auth').show()
  $('#change-password').hide()
  // $('.add-to-list')[0].reset()
}

const addToListFailure = function (response) {
  console.log('error')
}
const onGetCarSuccess = function (response) {
  store.currentcar = response.car
}
const updateCarSuccess = function (response) {
  console.log(response)
  store.car = response.car
}
// Handlebars
const printListSuccess = (data) => {
  console.log(data)
  const showCars = showCarsHB({ cars: data.cars })
  $('.content').html(showCars)
  $('.content').show()
  $('.before-auth, #signin, #change-password, #car-info').hide()
}

// Remove one obeject from the cars list using handelbars
// Clear all cars list < onRemoveSuccess
const clearCars = () => {
  $('.content').empty()
  $('.before-auth, #signin, #change-password, #car-info').hide()
}
// clear all objects first (clearCars) then get the new list from API
const onRemoveSuccess = (data) => {
  clearCars()
  api.getCars(data)
    .then(printListSuccess)
    // .catch(onRemoveFailure)
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  signInShow,
  changePasswordShow,
  carInfoShow,
  addToListSuccess,
  addToListFailure,
  printListSuccess,
  onRemoveSuccess,
  onGetCarSuccess,
  updateCarSuccess,
  clearCars
}
