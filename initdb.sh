#!/bin/sh

SDBQL=$(cat <<EOF
DEFINE TABLE user SCHEMAFULL
  PERMISSIONS 
    FOR select, update WHERE id = $auth.id, 
    FOR create, delete NONE;
DEFINE FIELD email ON user TYPE string;
DEFINE FIELD pass ON user TYPE string;
DEFINE FIELD settings.* ON user TYPE object;
DEFINE FIELD settings.marketing ON user TYPE string;
DEFINE FIELD tags ON user TYPE array;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
DEFINE SCOPE allusers
  SESSION 14d
  SIGNUP ( CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags )
  SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
EOF
)

echo "${SDBQL}" | surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test
