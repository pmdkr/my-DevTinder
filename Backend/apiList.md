# Dev Tinder APIs

- POST /signup
- POST /login
- POST /logout

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  //forgot password

- POST /request/send/status/:userId          //intersted
- POST /request/send/status/:userId          //ignored

- POST /request/review/:status/:requestedId => accepted
  -POST /request/review/:status/:requestId  => rejected

- GET /connections
- GET /request/recived
- GET /feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
