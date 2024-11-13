
# **Shortener url:**

`Deploy link`: https://shortener-url-gw9g.onrender.com/

The application allows users to shorten URLs in a simple and efficient way, offering not only the creation of short links but also advanced features for tracking and management. If the user is authenticated, they can:

1. **Shorten any valid URL** quickly and easily, generating unique short links.
2. **Track the performance of their URLs** with detailed reports on the number of clicks each shortened link receives, helping to monitor engagement and the effectiveness of their campaigns or shares.
3. **View a complete list of all shortened URLs** and their performance (clicks, creation date, etc.), with options to filter and sort the information.
4. **Delete specific links** from their account if they are no longer needed or desired, with the option for permanent removal or temporary deactivation.

Additionally, the platform offers an intuitive and user-friendly interface, compatible with both mobile and desktop devices, ensuring the best user experience in any context.

**Key Features:**

- URL Shortening: Quick creation of short links from valid URLs.
- Click Tracking: View the number of accesses each URL receives.
- URL Management: List of shortened URLs with filtering and sorting options for easy access and control.
- Link Deletion: Option to delete links.
- User Authentication: Secure access.

## Clone and install:


#### Clone Repository
```bash
  git clone "repo"
```

#### Install dependencies
```bash
  npm ci || npm install
```

Before the next steps, a `.env` file is required. The `.env.example` file contains the usage variables.

1. Run Docker
2. Run migrates: ```npm run migrate:run```
2. Run project: ```npm run dev```

## API Reference

### URLS ENDPOINT

#### Create short url

```http
  POST /
```
`Bearer token` **Optional**   

| Body Content       | Type     | Description                         
| :--------    |:------- | :----------------------------------
| `origUrl`    |`string` | **Required**. external url to short 

#### Redirect to origUrl

```http
  GET /
```

| Parameter | Type        | Description                       |
| :-------- | :-------    | :-------------------------------- |
| `urlId`   | `string` | **Required**. `urlId` is required to redirect from `shortUrl` to `origUrl` |


#### List all urls

```http
  GET /
```
`Bearer token` **Required**


| Query Parameter      | Type     | Description                  |  
| :--------    |:------- | :---------------------------------- |
| `perPage`    |`number` | **Required**. show items limit based on perPage      |
| `page`    |`number` | **Required**. current page     |
| `query`    |`number` | **Optional**. Search any url (filter applied on origUrl)     |



#### Delete url

```http
  DELETE /
```
`Bearer token` **Required**


| Parameter    | Type    | Description                                              |  
| :--------    |:------- | :---------------------------------- |
| `urlId`      |`number` |    **Required**. show items limit based on perPage      |


#### Update url

```http
  PATCH /
```
`Bearer token` **Required**


| Parameter    | Type    | Description                                              |  
| :--------    |:------- | :---------------------------------- |
| `urlId`      |`number` |    **Required**. show items limit based on perPage      |


| Body Content    | Type    | Description                                              |  
| :--------    |:------- | :---------------------------------- |
| `origUrl`      |`number` |    **Required**. to update current origUrl    |


## USERS ENDPOINT


#### Create User

```http
  POST /auth/register
```
| Body Content       | Type     | Description                       |  
| :--------    |:------- | :----------------------------------   |
| `name`    |`string` | **Required**. user name  |
| `email`    |`string` | **Required**. valid user email  |
| `password`    |`string` | **Required**. password  |
| `confirmPassword`    |`string` | **Required**. confirmPassword need match with password  |



#### Authenticate User

```http
  POST /auth/login
```
| Body Content       | Type     | Description                       |  
| :--------    |:------- | :----------------------------------   |
| `email`    |`string` | **Required**. valid user email  |
| `password`    |`string` | **Required**. password  |




#### Logout User

```http
  POST /auth/logout
```



#### Refresh Token

```http
  PATCH /refresh-token
```
| Cookie     | Type     | Description                       |  
| :--------    |:------- | :----------------------------------   |
| `refreshToken`    |`string` | **Required**. to verify and generate new token  |



## Documentation SWAGGER

[Documentation](https://shortener-url-gw9g.onrender.com/documentation#/)


## Badges


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Authors

- [@joaomarcosc](https://www.github.com/joaomarcosc)

