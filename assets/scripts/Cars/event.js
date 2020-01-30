const store = require('../store')
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

const addHandlers = function () {
  // $('#sign-in').on('submit', onSignIn)
  // $('#sign-up').on('submit', onSignUp)
  // $('#change-password').on('submit', onChangePassword)
  // $('#sign-out').on('submit', onSignOut)
  // $('#start-game').on('submit', onStartGame)
  // $('#reset').on('submit', onResetFunction)
  // $('#0').on('click', onClickBox)
  // $('#1').on('click', onClickBox)
  // $('#2').on('click', onClickBox)
  // $('#3').on('click', onClickBox)
  // $('#4').on('click', onClickBox)
  // $('#5').on('click', onClickBox)
  // $('#6').on('click', onClickBox)
  // $('#7').on('click', onClickBox)
  // $('#8').on('click', onClickBox)
}
module.exports = {
  addHandlers
}
