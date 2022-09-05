# README

- [README](#readme)
  - [Project Components](#project-components)
    - [Dynamic Module](#dynamic-module)
    - [Consumer App](#consumer-app)
  - [Install SurrealDb](#install-surrealdb)
  - [Starts SurrealDb](#starts-surrealdb)
  - [Init surrealDb](#init-surrealdb)
  - [Run App from Source Code](#run-app-from-source-code)
    - [Launch some Queries](#launch-some-queries)
  - [Run App with Docker Compose](#run-app-with-docker-compose)

## Project Components

### Dynamic Module

the main `@koakh/nestjs-surrealdb` nestjs dynamic module (library).
this is just a simple wrapper on top of [surrealdb.js integration](https://surrealdb.com/docs/integration/libraries/nodejs), 
check [github repo](https://github.com/surrealdb/surrealdb.js), 
and don't forget to **star** the project, this "dreamers" deserve it
### Consumer App

this is a simply [nestjs application](https://nestjs.com/) to showcase `@koakh/nestjs-surrealdb` integration

## Install SurrealDb

- [SurrealDB | Install](https://surrealdb.com/install)

## Starts SurrealDb

- [SurrealDB | Documentation](https://surrealdb.com/docs/start/starting-surrealdb)

```shell
# start with in memory
$ surreal start --user root --pass root
# or start with rocksdb (persisted on disk)
$ surreal start --user root --pass root file:mydb
# outcome
 .d8888b.                                             888 8888888b.  888888b.
d88P  Y88b                                            888 888  'Y88b 888  '88b
Y88b.                                                 888 888    888 888  .88P
 'Y888b.   888  888 888d888 888d888  .d88b.   8888b.  888 888    888 8888888K.
    'Y88b. 888  888 888P'   888P'   d8P  Y8b     '88b 888 888    888 888  'Y88b
      '888 888  888 888     888     88888888 .d888888 888 888    888 888    888
Y88b  d88P Y88b 888 888     888     Y8b.     888  888 888 888  .d88P 888   d88P
 'Y8888P'   'Y88888 888     888      'Y8888  'Y888888 888 8888888P'  8888888P'


[2022-09-05 23:05:47] INFO  surrealdb::iam Root authentication is enabled
[2022-09-05 23:05:47] INFO  surrealdb::iam Root username is 'root'
[2022-09-05 23:05:47] INFO  surrealdb::dbs Database strict mode is disabled
[2022-09-05 23:05:47] INFO  surrealdb::kvs Starting kvs store at file:mydb
[2022-09-05 23:05:47] INFO  surrealdb::kvs Started kvs store at file:mydb
[2022-09-05 23:05:47] INFO  surrealdb::net Starting web server on 0.0.0.0:8000
[2022-09-05 23:05:47] INFO  surrealdb::net Started web server on 0.0.0.0:8000
```

## Init surrealDb

import the `initdb.sql` 

```shell
# import schemafull
$ surreal import initdb.sql --conn http://localhost:8000 --user root --pass root --ns test --db test
# outcome
[2022-09-05 23:07:01] INFO  surrealdb::cli The SQL file was imported successfully

# check info for db
$ echo "INFO FOR DB;" | surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test | jq
[
  {
    "time": "129.866µs",
    "status": "OK",
    "result": {
      "dl": {},
      "dt": {},
      "sc": {
        "allusers": "DEFINE SCOPE allusers SESSION 2w SIGNUP (CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags) SIGNIN (SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass))"
      },
      "tb": {
        "person": "DEFINE TABLE person SCHEMALESS",
        "user": "DEFINE TABLE user SCHEMAFULL PERMISSIONS FOR select WHERE id = $auth.id, FOR create NONE, FOR update WHERE id = $auth.id, FOR delete NONE"
      }
    }
  }
]

# check info for user
$ echo "INFO FOR TABLE user;" | surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test | jq
[
  {
    "time": "112.283µs",
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

done we have a ready to play surrealdb database ready to use with `signup` and `signin`

> more info on [gist](https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b)

## Run App from Source Code

```shell
$ cd consumer-app
$ npm i
$ npm start
```

> note for local package in `"@koakh/nestjs-surrealdb": "file:../dynamic-module"`

### Launch some Queries

install [Rest Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

open [client.http](client.http) and start fire some requests

or just use some curls

```shell
# postSignup
$ curl --request POST \
  --url http://localhost:3000/signup \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"ns": "test","db": "test","sc": "allusers","email": "tobie@surrealdb.com","pass": "some password","marketing": true,"tags": ["rust", "golang", "javascript"]}'
# outcome
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjI0MTU4MjYsIm5iZiI6MTY2MjQxNTgyNiwiZXhwIjoxNjYzNjI1NDI2LCJpc3MiOiJTdXJyZWFsREIiLCJucyI6InRlc3QiLCJkYiI6InRlc3QiLCJzYyI6ImFsbHVzZXJzIiwiaWQiOiJ1c2VyOjB3aGdnZHdna205d2w2aDY4emxjIn0.v3rueJnSIoJfmv_KiA-3BolWuSdNBdWw2XkvCEUyuifuInzoyJxB9VOtbteFhDyTVHXrd0ROiUASKwNJLiZACg

# postQuery: SELECT * FROM $auth
$ curl --request POST \
  --url http://localhost:3000/query \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"sql": "SELECT * FROM $auth"}'
# outcome
[
  {
    "result": [
      {
        "email": "tobie@surrealdb.com",
        "id": "user:0whggdwgkm9wl6h68zlc",
        "pass": "$argon2id$v=19$m=4096,t=3,p=1$Ifk8ToH+kVm2rkp/ozsbEw$LlcNW8elxRX2uHsRQasxCy3kyQyWlo3mz+gWUgnddwg",
        "settings": {
          "marketing": "true"
        },
        "tags": [
          "golang"
        ]
      }
    ],
    "status": "OK",
    "time": "185.332µs"
  }
]

# postQuery: SELECT * FROM $session
$ curl --request POST \
  --url http://localhost:3000/query \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"sql": "SELECT * FROM $session"}'
# outcome
[
  {
    "result": [
      {
        "db": "test",
        "id": null,
        "ip": "127.0.0.1:54928",
        "ns": "test",
        "or": null,
        "sc": "allusers",
        "sd": "user:0whggdwgkm9wl6h68zlc"
      }
    ],
    "status": "OK",
    "time": "60.966µs"
  }
]

# postQuery: SELECT * FROM $scope
$ curl --request POST \
  --url http://localhost:3000/query \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"sql": "SELECT * FROM $scope"}'
# outcome
[
  {
    "result": [
      "allusers"
    ],
    "status": "OK",
    "time": "46.318µs"
  }
]

# postCreate
$ curl --request POST \
  --url http://localhost:3000/ \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"id": "person:uv1o55sjes0tdpa31ool","title": "Founder & CEO","name": {"first": "Tobie","last": "Morgan Hitchcock"},"marketing": true,"age": 28}'
# outcome
{
  "age": 28,
  "id": "person:uv1o55sjes0tdpa31ool",
  "marketing": true,
  "name": {
    "first": "Tobie",
    "last": "Morgan Hitchcock"
  },
  "title": "Founder & CEO"
}

# getSelect
$ curl --request GET \
  --url http://localhost:3000/person:uv1o55sjes0tdpa31ool \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient'
# outcome
[
  {
    "age": 28,
    "id": "person:uv1o55sjes0tdpa31ool",
    "marketing": true,
    "name": {
      "first": "Tobie",
      "last": "Morgan Hitchcock"
    },
    "title": "Founder & CEO"
  }
]

# postQuery: SELECT id, string::concat(name.first, ' ', name.last) AS name, age FROM $id;
$ curl --request POST \
  --url http://localhost:3000/query \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"sql": "SELECT id, string::concat(name.first, '\'' '\'', name.last) AS name, age FROM $id;","vars": {"id": "person:uv1o55sjes0tdpa31ool"}}'
# outcome
[
  {
    "result": [
      {
        "age": 28,
        "id": "person:uv1o55sjes0tdpa31ool",
        "name": "Tobie Morgan Hitchcock"
      }
    ],
    "status": "OK",
    "time": "142.58µs"
  }
]

# putUpdate
$ curl --request PUT \
  --url http://localhost:3000/person:uv1o55sjes0tdpa31ool \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"name": {"first": "Mário","last": "Monteiro"},"age": 50,"country": "Portugal"}'
# outcome
{
  "age": 50,
  "country": "Portugal",
  "id": "person:uv1o55sjes0tdpa31ool",
  "name": {
    "first": "Mário",
    "last": "Monteiro"
  }
}

# patchChange
$ curl --request PATCH \
  --url http://localhost:3000/person:uv1o55sjes0tdpa31ool \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"name": {"first": "Tobie changed...","last": "Morgan Hitchcock changed..."}}'
# outcome
{
  "age": 50,
  "country": "Portugal",
  "id": "person:uv1o55sjes0tdpa31ool",
  "name": {
    "first": "Tobie changed...",
    "last": "Morgan Hitchcock changed..."
  }
}

# patchModify
$ curl --request PATCH \
  --url http://localhost:3000/modify/person:uv1o55sjes0tdpa31ool \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"name": {"fullName": "Tobie Morgan Hitchcock"}}'
# outcome
{
  "age": 50,
  "country": "Portugal",
  "id": "person:uv1o55sjes0tdpa31ool",
  "name": {
    "fullName": "Tobie Morgan Hitchcock"
  }
}

# deleteDelete
$ curl --request DELETE \
  --url http://localhost:3000/person:uv1o55sjes0tdpa31ool \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient'
# outcome
none

# postInfo
$ curl --request POST \
  --url http://localhost:3000/info \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{}'
# outcome
{
  "email": "tobie@surrealdb.com",
  "id": "user:0whggdwgkm9wl6h68zlc",
  "pass": "$argon2id$v=19$m=4096,t=3,p=1$Ifk8ToH+kVm2rkp/ozsbEw$LlcNW8elxRX2uHsRQasxCy3kyQyWlo3mz+gWUgnddwg",
  "settings": {
    "marketing": "true"
  },
  "tags": [
    "golang"
  ]
}
```

## Run App with Docker Compose

> first stop surrealdb binnary

> required docker and docker-compose installed

before build image, change `consumer-app/package.json` to use published package

change `@koakh/nestjs-surrealdb": "file:../dynamic-module"` with `@koakh/nestjs-surrealdb": "^0.1.1"`

```shell
$ cd consumer-app
$ npm i
$ cd ..
$ docker-compose build
$ docker-compose up
# or use daemon mode
$ docker-compose up -d
```

done, now you can do the same steps as in `Run App from Source Code`, init db, and launch some requests