curl --include --request POST "https://sleepy-fjord-72760.herokuapp.com/cars" \
--header "Authorization: Token token=${TOKEN}" \
--header "Content-type: application/json" \
--data '{
  "car": {
    "id": 3,
    "cells": ["","","","","","","","",""],
    "over": false,
    "player_x": {
      "id": 1,
      "email": "and@and.com"
    },
    "player_o": null
  }
}'


echo
