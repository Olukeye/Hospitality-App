# Hospitality-App
A place of relaxation, booking, restaurant and leisurs.

- Register as user.

```
//Endpoint is:

http://localhost:2027/api/auth/signup

{
    "username": "boma",
    "email": "boma@gmail.com",
    "password": "boma"
}

-Response is
-status code is 201 created

{
    "username": "boma",
    "email": "boma@gmail.com",
    "password": "U2FsdGVkX1873dY3jFF6XwC/a7j72anlKC3o5QJTQHk=",
    "isAdmin": false,
    "_id": "63ea47ea35766db251bbc62d",
    "createdAt": "2023-02-13T14:23:38.424Z",
    "updatedAt": "2023-02-13T14:23:38.424Z",
    "__v": 0
}
```

- Login

```
//Endpoint is:

http://localhost:2027/api/auth/login

{
    "email": "boma@yahoo.com",
    "password": "boma"
}

-Response with:
-status code is 201 Created

{
    "_id": "63cfad77d5002406011219b2",
    "username": "boma",
    "email": "boma@gmail.com",
    "createdAt": "2023-01-24T10:05:43.780Z",
    "updatedAt": "2023-01-24T10:05:43.780Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2ZhZDc3ZDUwMDI0MDYwMTEyMTliMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzYyOTY2OTIsImV4cCI6MTY3NjkwMTQ5Mn0.c5JKgEgfpzvdFnp-c8nTCbn52bnpcXOTEsDweSJB4Mo"
}
```

- Response for Invalid login credential

```
{
   "Wrong email or password!"
}
```

## Hotels Routes

- Get all Hotels Route

```
//Endpoint is:

http://localhost:2027/api/hotels

{
    "name":"presidential suit",
    "city":"Port",
    "address":"phc",
    "type":"cabin",
    "image":"",
    "price": 435,
    "distance":"3km",
    "discription":"nice place",
    "rating":1
}

-Response with:
-status code is 201 Created

{
    "name": "presidential suit",
    "city": "Port",
    "type": "cabin",
    "address": "phc",
    "distance": "3km",
    "image": [
        ""
    ],
    "rooms": [],
    "price": 435,
    "discription": "nice place",
    "rating": 1,
    "featured": false,
    "_id": "63f4b5f9854d5a25082cedc9",
    "createdAt": "2023-02-21T12:15:54.005Z",
    "updatedAt": "2023-02-21T12:15:54.005Z",
    "__v": 0
}

- Update hotel route
```
//Endpoint is:

http://localhost:2027/api/hotels/hotel id

{
    "name":"Chapter's Hotel",
    "price": 435,
    "distance":"3km",
    "discription":"nice place",

}
-Response with:
-status code is 200 ok

{
    "_id": "63f4b5f9854d5a25082cedc9",
    "name": "Chapter's Hotel",
    "city": "Portnovio",
    "type": "cabinent",
    "address": "phc",
    "distance": "3km",
    "image": [
        ""
    ],
    "rooms": [],
    "price": 435,
    "discription": "nice place",
    "rating": 1,
    "featured": false,
    "createdAt": "2023-02-21T12:15:54.005Z",
    "updatedAt": "2023-02-21T13:12:33.475Z",
    "__v": 0
}

- create guest_room route

```
//Endpoint is:

http://localhost:2027/api/rooms/hotel_id(63e28ec245da69b28d98ae79)

{
    "title":"rest room",
    "price":500,
    "roomNumber":[{"number":99}, {"number":100} ],
     "description":"room!!",
    "maxGuestPerRoom":1
}

-Response with:
-status code is 201 Created

{
    "message": "Room created successfully",
    "data": {
        "title": "rest room",
        "roomNumber": [
            {
                "number": 99,
                "bookedDate": [],
                "_id": "63f4c638854d5a25082cedd6"
            },
            {
                "number": 100,
                "bookedDate": [],
                "_id": "63f4c638854d5a25082cedd7"
            }
        ],
        "price": 500,
        "maxGuestPerRoom": 1,
        "description": "room!!",
        "_id": "63f4c638854d5a25082cedd5",
        "createdAt": "2023-02-21T13:25:12.196Z",
        "updatedAt": "2023-02-21T13:25:12.196Z",
        "__v": 0
    }
}

- update guest_room
```
//Endpoint is:

http://localhost:2027/api/rooms/63d3e400ce32168a8321a1a2

{
    "hotelId":"63c6c4f25765c07f65afc28c",
    "title":"Mistress Apartment",
    "price":700,
    "roomNumber":[{"number":20}, {"number":21} ],
     "description":"this is serious!!!!!!!!!!!!",
    "maxGuestPerRoom":2
}


//Endpoint for quering hotel by their properties:

http://localhost:2027/api/hotels/hotelNameSearch?search=(hotel by its name) 
http://localhost:2027/api/hotels/countrySearch?search=(hotel by its city)
http://localhost:2027/api/hotels/hotelTypeSearch= types


//Endpoint for getting rooms  by hotel_id:

http://localhost:2027/api/hotels/guest_room/63e28ec245da69b28d98ae79
