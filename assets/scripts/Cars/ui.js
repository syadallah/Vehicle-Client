'use strict'
const store = require('./../store')
const api = require('./api')
const showCarsHB = require('./../templates/car-listing.handlebars')

// sign up
const signUpSuccess = function (response) {
  $('#sign-up')[0].reset()
  // show message
  $('#success-message').html('successfuly signed up').show()
  // hide message after 3 sec
  setTimeout(function () {
    $('#success-message').slideUp('slow')
  }, 2500)
}
const signUpFailure = function (response) {
  $('#sign-up')[0].reset()
  $('#failure-message').html('Error: could not sign up. Please try again!').show()
  setTimeout(function () {
    $('#failure-message').slideUp('slow')
  }, 2500)
}

// sign in
const signInSuccess = function (response) {
  store.user = response.user
  $('#sign-in')[0].reset()
  $('.after-auth').show()
  $('.before-auth, #signin, #change-password, #car-info, #update-info').hide()
  $('#success-message').html('successfuly signed in').show()
  setTimeout(function () {
    $('#success-message').slideUp('slow')
  }, 2500)
}
const signInFailure = function (response) {
  $('#sign-in')[0].reset()
  $('#failure-message').html('Error: could not sign in. Please try again!').show()
  setTimeout(function () {
    $('#failure-message').slideUp('slow')
  }, 2500)
}

// Change password
const changePasswordSuccess = function (response) {
  store.user = response.user
  $('.after-auth').show()
  $('.before-auth, #signin').hide()
  $('#success-message').html('You have got youself new password').show()
  setTimeout(function () {
    $('#success-message').slideUp('slow')
  }, 2500)
}
const changePasswordFailure = function () {
  console.log('error')
  $('#failure-message').html('Error: could not change password').show()
  setTimeout(function () {
    $('#failure-message').slideUp('slow')
  }, 2500)
}

// sign out
const signOutSuccess = function (response) {
  $('#sign-in, #sign-up, #change-password')[0].reset()
  $('h1, p, #signin').show()
  $('.after-auth, .before-auth, .content').hide()
  $('#success-message').html('You have been signed out').show()
  setTimeout(function () {
    $('#success-message').slideUp('slow')
  }, 2000)
}
const signOutFailure = function () {
  $('#failure-message').html('Error: could not sign out. Please try again!').show()
  setTimeout(function () {
    $('#failure-message').slideUp('slow')
  }, 2500)
}

// Show forms after click on button on nav bar
const signInShow = function () {
  $('.before-auth').show()
  $('h1, p').hide()
}
const changePasswordShow = function () {
  $('#change-password').show()
  $('#car-info, #update-info, .content').hide()
}
const carInfoShow = function () {
  $('#car-info').show()
  $('.content, #update-info, #change-password').hide()
}

// Add costs to list form and store data
const addToListSuccess = function (response) {
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
  store.car = response.car
}
// Handlebars
const printListSuccess = (data) => {
  const carTotal = data.cars.map(car => {
    car.total = car.gas + car.insurance
    return car
  })
  let gasTotal = 0
  carTotal.forEach(car => {
    gasTotal += car.gas
    console.log(gasTotal)
  })
  const showCars = showCarsHB({ cars: carTotal })
  $('.content').html(showCars)
  $('.content').show()
  $('.before-auth, #signin, #change-password, #car-info, #update-info').hide()
}

// Remove one obeject from the cars list using handelbars
// Clear all cars list < onRemoveSuccess
const clearCars = () => {
  $('.content').empty()
  $('.before-auth, #signin, #change-password, #car-info, #update-info').hide()
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
  signUpFailure,
  signInSuccess,
  signInFailure,
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
