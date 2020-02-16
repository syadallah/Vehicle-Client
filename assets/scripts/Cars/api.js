'use strict'
const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data

  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: data

  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data

  })
}
const signOut = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data

  })
}

const addToList = function (data) {
  return $.ajax({
    url: config.apiUrl + '/cars',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const printList = function () {
  return $.ajax({
    url: config.apiUrl + '/cars',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const removeCar = function (carId) {
  return $.ajax({
    url: config.apiUrl + '/cars/' + carId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateCar = function (data) {
  return $.ajax({
    url: config.apiUrl + '/cars/' + store.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}
module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  addToList,
  removeCar,
  printList,
  updateCar
}
