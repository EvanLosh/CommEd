#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
import random
import math
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Comment, Tag, Playlist

fake = Faker()

# Function to generate fake users
def generate_fake_user():
    username=fake.name()
    if len(username) > 20:
        username = username[0:20]
    return User(
        username=username,
        email=fake.email(),
        datetime_created=datetime.now()
    )

def generate_fake_tag():
    words = fake.text(max_nb_chars=20)
    return Tag(
        text = words,
        datetime_created = datetime.now()
        )

def generate_fake_post():
    return Post(
        owner_id = random.choice(User.query.all()).id,
        title = fake.text(50),
        problem_body = fake.text(max_nb_chars=100),
        answer_body = fake.text(max_nb_chars=100),
        solution_body = fake.text(max_nb_chars=100),
        references = fake.text(max_nb_chars=100),
        datetime_created=datetime.now()
    )

def generate_fake_playlist():
    return Playlist(
        owner_id = random.choice(User.query.all()).id,
        title = fake.text(50),
        datetime_created=datetime.now()
    )

def generate_fake_root_comment():
    return Comment(
        owner_id = random.choice(User.query.all()).id,
        body = fake.text(70),
        post_id = random.choice(Post.query.all()).id, # if there are no posts, throws an error
        datetime_created = datetime.now()
        )

def generate_fake_child_comment():
    return Comment(
        owner_id = random.choice(User.query.all()).id,
        body = fake.text(70),
        parent_id = random.choice(Comment.query.all()).id, # if there are no comments, throws an error
        datetime_created = datetime.now()
        )




# Main function to seed the database
def seed_database():
    with app.app_context():
        # delete all entries in the database
        for i in (User.query.all() + Post.query.all() + Tag.query.all() + Comment.query.all() + Playlist.query.all()):
            db.session.delete(i)
        db.session.commit()

        # generate new users
        for i in range(8):
            user = generate_fake_user()
            db.session.add(user)
        db.session.add(User(username='dev', email='dev', datetime_created=datetime.now()))
        db.session.commit()

        # generate new posts
        for i in range(12):
            post = generate_fake_post()
            db.session.add(post)
        db.session.commit()

        # generate new tags
        for i in range(12):
            tag = generate_fake_tag()
            db.session.add(tag)
        db.session.commit()

        # generate new root comments
        for i in range(20):
            comment = generate_fake_root_comment()
            db.session.add(comment)
        db.session.commit()

        # generate new child comments
        for i in range(35):
            comment = generate_fake_child_comment()
            db.session.add(comment)
            # commit comments one at a time to generate chains of comments
            db.session.commit()
        
        #generate new playlists
        for i in range(8):
            playlist = generate_fake_playlist()
            db.session.add(playlist)
        db.session.commit()

        # add tags to posts
        for i in Post.query.all():
            for j in random.sample(Tag.query.all(), random.choice(range(2,len(Tag.query.all())))):
                i.tags.append(j)
        #     post_tag = generate_fake_post_tag()
        #     db.session.add(post_tag)
            
            # commit one at a time to avoid making duplicates
            db.session.commit()
        

        # add posts to playlists
        for i in Playlist.query.all():
            for j in random.sample(Post.query.all(), random.choice(range(2, len(Post.query.all())))):
                i.posts.append(j)
        #     playlist_post = generate_fake_playlist_post()
        #     db.session.add(playlist_post)
            # commit one at a time to avoid making duplicates
            db.session.commit()


   
    
if __name__ == "__main__":
    seed_database()