<a name="top"></a>
#  v0.0.0



- [Api](#api)
	- [Welcome message](#welcome-message)
	
- [Auth](#auth)
	- [Login](#login)
	- [Signup](#signup)
	
- [Rooms](#rooms)
	- [Create Room](#create-room)
	- [Room unique ID.](#room-unique-id.)
	- [](#)
	- [Room unique ID.](#room-unique-id.)
	- [Room unique ID.](#room-unique-id.)
	


# <a name='api'></a> Api

## <a name='welcome-message'></a> Welcome message
[Back to top](#top)



	GET /api/






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Welcome | String | <p>message.</p>|

# <a name='auth'></a> Auth

## <a name='login'></a> Login
[Back to top](#top)



	POST /api/auth/login





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  email | String | <p>Email of the User.</p>|
|  password | String | <p>Password of the user</p>|



### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  alias | String | <p>Alias of the User.</p>|
|  email | String | <p>Email of the User.</p>|
|  token | String | <p>Authentification token of the User.</p>|

## <a name='signup'></a> Signup
[Back to top](#top)



	POST /api/auth/signup





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  alias | String | <p>Alias of the User.</p>|
|  email | String | <p>Email of the User.</p>|
|  password | String | <p>Password of the user</p>|



### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  alias | String | <p>Alias of the User.</p>|
|  email | String | <p>Email of the User.</p>|
|  token | String | <p>Authentification token of the User.</p>|

# <a name='rooms'></a> Rooms

## <a name='create-room'></a> Create Room
[Back to top](#top)



	POST /api/room/create





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  name | String | <p>Name of the room.</p>|
|  password | String | <p>Password of the room.</p>|



### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  name | String | <p>Name of the room.</p>|
|  createdAt | Date | <p>Creation date.</p>|
|  creator | Object | <p>Creator informations.</p>|
|  users | Object[] | <p>Users informations.</p>|

## <a name='room-unique-id.'></a> Room unique ID.
[Back to top](#top)



	DELETE /api/room/delete/:id






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| &nbsp;&nbsp;&nbsp;&nbsp; Success. |  | |

## <a name=''></a> 
[Back to top](#top)



	GET /api/room/all






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Rooms | Object[] | <p>informations.</p>|

## <a name='room-unique-id.'></a> Room unique ID.
[Back to top](#top)



	GET /api/room/:id






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  name | String | <p>Name of the room.</p>|
|  _id | String | <p>Unique ID of the room.</p>|
|  createdAt | Date | <p>Creation date.</p>|
|  creator | Object | <p>Creator informations.</p>|
|  users | Object[] | <p>Users informations.</p>|

## <a name='room-unique-id.'></a> Room unique ID.
[Back to top](#top)



	PUT /api/room/update/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  name | String | <p>Name of the room.</p>|
|  password | String | <p>Password of the room (not mandatory).</p>|



### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  name | String | <p>Name of the room.</p>|
|  createdAt | Date | <p>Creation date.</p>|
|  creator | Object | <p>Creator informations.</p>|
|  users | Object[] | <p>Users informations.</p>|

