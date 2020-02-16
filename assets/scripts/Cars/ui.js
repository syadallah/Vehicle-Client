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
  $('.after-auth').show()
  $('.before-auth, #signin').hide()
  $('#success-message').html('You have got youself new password').show()
  setTimeout(function () {
    $('#success-message').slideUp('slow')
  }, 2500)
}
const changePasswordFailure = function () {
  $('#failure-message').html('Error: could not change password').show()
  setTimeout(function () {
    $('#failure-message').slideUp('slow')
  }, 2500)
}

// sign out
const signOutSuccess = function (response) {
  $('#sign-in, #sign-up, #change-password')[0].reset()
  $('h1, p, #signin').show()
  $('.after-auth, .before-auth, .print-list').hide()
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
  $('#car-info, #update-info, .print-list').hide()
}
const carInfoShow = function () {
  $('#car-info').show()
  $('.print-list, #update-info, #change-password').hide()
}

// Add costs to list formcontent and store data
const addToListSuccess = function (response) {
  store.car = response.car
  $('#car-info')[0].reset()
  $('.after-auth').show()
  $('#change-password').hide()
  $('#success-message').html('successfuly added').show()
  setTimeout(function () {
    $('#success-message').slideUp('slow')
  }, 2000)
  // $('.add-to-list')[0].reset()
}

const onGetCarSuccess = function (response) {
  store.currentcar = response.car
}
const updateCarSuccess = function (response) {
  store.car = response.car
  $('#success-message').html('successfuly updated').show()
  setTimeout(function () {
    $('#success-message').slideUp('slow')
  }, 2000)
}
// Handlebars
const printListSuccess = (data) => {
  // if there are no cars
  if (data.cars.length === 0) {
    $('.print-list, #change-password').hide()
    $('#success-message').html('Please add cost, your lis is empty.').show()
    setTimeout(function () {
      $('#success-message').slideUp('slow')
    }, 2000)
  // if there are cars
  } else {
    const carTotal = data.cars.map(car => {
      car.total = car.gas + car.insurance + car.rcost
      return car
    })
    let gasTotal = 0
    let insurance = 0
    let maintenance = 0
    carTotal.forEach(car => {
      gasTotal += car.gas
      insurance += car.insurance
      maintenance += car.rcost
      $('#total').html(`Maintenance Total:&nbsp; &nbsp;${maintenance}$ <br>
        Insurance Total:&nbsp; &nbsp;${insurance}$ <br>
        Gas Total:&nbsp;&nbsp;${gasTotal}$`)
      $('#total').show()
    })
    const showCars = showCarsHB({ cars: carTotal })
    $('#item').html(showCars)
    $('#item').show()
    $('.before-auth, #signin, #change-password, #car-info, #update-info').hide()
  }
}

// Remove one obeject from the cars list using handelbars
// Clear all cars list < onRemoveSuccess
const clearCars = () => {
  $('.print-list').empty()
  $('.before-auth, #signin, #change-password, #car-info, #update-info, .print-list').hide()
}
// clear all objects first (clearCars) then get the new list from API
const onRemoveSuccess = (data) => {
  clearCars()
  api.getCars(data)
    .then(printListSuccess)
  // .catch(onRemoveFailurspace-betweene)
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
  printListSuccess,
  onRemoveSuccess,
  onGetCarSuccess,
  updateCarSuccess,
  clearCars
}
