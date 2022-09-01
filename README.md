# README

- [README](#readme)
  - [Project Components](#project-components)
    - [Dynamic Module](#dynamic-module)
    - [Consumer App](#consumer-app)
  - [Install SurrealDb](#install-surrealdb)
  - [Starts SurrealDb](#starts-surrealdb)
  - [Init surrealDb](#init-surrealdb)
  - [Run App](#run-app)
  - [Launch some Queries](#launch-some-queries)

## Project Components

### Dynamic Module

the main `@koakh/nestjs-surrealdb-driver`, that is just a simple wrapper on top of [surrealdb.js integration](https://surrealdb.com/docs/integration/libraries/nodejs), check git [repo](https://github.com/surrealdb/surrealdb.js) here, and don't forget to **fire some stars** everywhere, this "dreamers" deserve it
### Consumer App

this is a simply [nestjs](https://nestjs.com/) app to showcase `@koakh/nestjs-surrealdb-driver`

## Install SurrealDb

- [SurrealDB | Install](https://surrealdb.com/install)

## Starts SurrealDb

- [SurrealDB | Documentation](https://surrealdb.com/docs/start/starting-surrealdb)

```shell
# start with rocksdb
$ surreal start --user root --pass root file:mydb
```

## Init surrealDb

follow this [gist](https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b)

or better import the `initdb.sql` 

```shell
# import schemafull
$ surreal import initdb.sql --conn http://localhost:8000 --user root --pass root --ns test --db test
# check info for db
$ echo "INFO FOR DB;" | surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test | jq
[
  {
    "time": "154.001µs",
    "status": "OK",
    "result": {
      "dl": {},
      "dt": {},
      "sc": {
        "allusers": "DEFINE SCOPE allusers SESSION 2w SIGNUP (CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags) SIGNIN (SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass))"
      },
      "tb": {
        "user": "DEFINE TABLE user SCHEMAFULL PERMISSIONS FOR select WHERE id = $auth.id, FOR create NONE, FOR update WHERE id = $auth.id, FOR delete NONE"
      }
    }
  }
]
# check info for user
$ echo "INFO FOR TABLE user;" | surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test | jq
[
  {
    "time": "128.964µs",
    "status": "OK",
    "result": {
      "ev": {},
      "fd": {
        "email": "DEFINE FIELD email ON user TYPE string",
        "pass": "DEFINE FIELD pass ON user TYPE string",
        "settings.marketing": "DEFINE FIELD settings.marketing ON user TYPE string",
        "settings[*]": "DEFINE FIELD settings[*] ON user TYPE object",
        "tags": "DEFINE FIELD tags ON user TYPE array"
      },
      "ft": {},
      "ix": {
        "idx_email": "DEFINE INDEX idx_email ON user FIELDS email UNIQUE"
      }
    }
  }
]
```

done we have a ready to play surrealdb database ready to use with signup and signin

## Run App

```shell
$ cd consumer-app
$ npm i
$ npm start
```

## Launch some Queries

install [Rest Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

open [client.http](client.http) and start fire some requests