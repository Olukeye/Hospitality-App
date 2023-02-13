# Hospitality-App
A place of relaxation, booking, restaurant and leisurs.

- Register as user.

```
//Endpoint is

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
//Endpoint is

http://localhost:2027/api/auth/login

{
    "email": "boma@yahoo.com",
    "password": "boma"
}

-Response is
-status code is 200 Ok

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

## Donors (Users) Routes

- Get all Hotels Route

```
//Endpoint is

