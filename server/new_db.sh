#!/usr/bin/env bash

# Delete the previous db
rm -r ./instance
rm -r ./migrations

# Create a new empty database
flask db init
flask db migrate -m "initial migration"
flask db upgrade head

# Insert seed data into the database for testing and demonstration purposes
python seed.py