<a name="top"></a>
#  v0.0.0



- [Api](#api)
	- [Welcome message](#welcome-message)
	
- [Auth](#auth)
	- [Login](#login)
	- [Signup](#signup)
	


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

