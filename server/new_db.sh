#!/usr/bin/env bash

rm -r ./instance
rm -r ./migrations

flask db init
flask db migrate -m "initial migration"
flask db upgrade head

python seed.py