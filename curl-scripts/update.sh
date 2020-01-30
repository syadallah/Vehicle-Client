curl --include --request PATCH "https://sleepy-fjord-72760.herokuapp.com/cars/${ID}" \
--header "Authorization: Token token=${TOKEN}" \
--header "Content-type: application/json" \
--data '{
  "car": {
    "cell": {
      "index": 0,
      "value": "x"
    },
    "over": false
  }
}'
