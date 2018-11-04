<a name="top"></a>
#  v0.0.0



- [Api](#api)
	- [Welcome message](#welcome-message)
	
- [Auth](#auth)
	- [Login](#login)
	- [Signup](#signup)
	
- [Chat](#chat)
	- [Unique room id](#unique-room-id)
	
- [Rooms](#rooms)
	- [Create Room](#create-room)
	- [Room unique ID.](#room-unique-id.)
	- [](#)
	- [Room unique ID.](#room-unique-id.)
	- [Room unique ID.](#room-unique-id.)
	- [Room unique ID.](#room-unique-id.)
	
- [Users](#users)
	- [](#)
	- [](#)
	- [Unique id of user](#unique-id-of-user)
	- [Unique id](#unique-id)
	- [](#)
	- [](#)
	- [](#)
	


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



	POST /api/auth/signin





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
|  _id | String | <p>Unique id of the User.</p>|
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
|  _id | String | <p>Unique id of the User.</p>|

# <a name='chat'></a> Chat

## <a name='unique-room-id'></a> Unique room id
[Back to top](#top)



	POST /api/chat/messages/:id






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| &nbsp;&nbsp;&nbsp;&nbsp; Ok. | Object[] | |

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



	GET /api/room/join/:id






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  status | String | <p>State of connection (always &quot;connected&quot;).</p>|

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

# <a name='users'></a> Users

## <a name=''></a> 
[Back to top](#top)



	POST /api/users/follow





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  userId | String | <p>to follow</p>|



### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| &nbsp;&nbsp;&nbsp;&nbsp; Ok. | String | |

## <a name=''></a> 
[Back to top](#top)



	GET /api/users/me






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  alias | String | <p>Alias of the user.</p>|
|  unique | String | <p>id of the user.</p>|
|  email | String | <p>of the user.</p>|

## <a name='unique-id-of-user'></a> Unique id of user
[Back to top](#top)



	GET /api/users/:id






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| &nbsp;&nbsp;&nbsp;&nbsp; user. | Object | |

## <a name='unique-id'></a> Unique id
[Back to top](#top)



	POST /api/users/followers/:id






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| &nbsp;&nbsp;&nbsp;&nbsp; Ok. | Object[] | |

## <a name=''></a> 
[Back to top](#top)



	GET /api/users?alias=alias





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  alias | String | <p>to search</p>|



### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| &nbsp;&nbsp;&nbsp;&nbsp; users. | Object[] | |

## <a name=''></a> 
[Back to top](#top)



	POST /api/users/unfollow





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  userId | String | <p>to unfollow</p>|



### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| &nbsp;&nbsp;&nbsp;&nbsp; Ok. | String | |

## <a name=''></a> 
[Back to top](#top)



	PUT /api/users/me






### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  alias | String | <p>Alias of the user.</p>|
|  unique | String | <p>id of the user.</p>|
|  email | String | <p>of the user.</p>|

