#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
import random
import math
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

fake = Faker()

# Function to generate fake users
def generate_fake_user():
    return User(
        username=fake.name(),
        # Add other user-related fields as needed
    )


# Main function to seed the database
def seed_database(num_users):
    with app.app_context():
        # delete all entries in the database
        for i in User.query.all():
            db.session.delete(i)
        db.session.commit()

        # generate new entries
        for _ in range(num_users):
            user = generate_fake_user()
            db.session.add(user)
            db.session.commit()
            
   
    
if __name__ == "__main__":
    seed_database(num_users=10)