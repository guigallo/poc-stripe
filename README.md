# poc-stripe

## Prepare strapi env

use `Secret key` from [apikeys](https://dashboard.stripe.com/test/apikeys) in .env

install [strapi cli](https://stripe.com/docs/stripe-cli)


## Run locally and listen stripe hooks

install package dependencies:

`yarn`

run server to create payment link and listen to their hooks:

`yarn start`

connect local server to strapi:

`stripe listen --forwared-to localhost:8000/webhook`
