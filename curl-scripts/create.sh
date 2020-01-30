curl --include --request POST "https://sleepy-fjord-72760.herokuapp.com/cars" \
--header "Authorization: Token token=${TOKEN}" \
--header "Content-type: application/json" \
--data '{
  "car": {

  }
}'


echo
