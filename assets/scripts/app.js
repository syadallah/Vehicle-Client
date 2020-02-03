'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const carEvents = require('./Cars/event')
$(() => {
  $('.after-auth').hide()
  $('.before-auth').hide()

  // your JS code goes here
  carEvents.addHandlers()
})
