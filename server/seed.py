#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
import random
import math
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Comment, Tag, Playlist, PlaylistPost, PostTag

fake = Faker()

# Function to generate fake users
def generate_fake_user():
    return User(
        username=fake.name(),
        email=fake.email(),
        datetime_created=datetime.now()
        # Add other user-related fields as needed
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

def generate_fake_comment():
    post_id = random.choice(Post.query.all()).id, # if there are no posts, throws an error
    parent_comment_id = -1
    same_post_comments = Comment.query.filter_by(post_id = post_id).all()
    if len(same_post_comments) > 0:
        parent_comment_id = random.choice(same_post_comments).id
    return Comment(
        owner_id = random.choice(User.query.all()).id,
        body = fake.text(70),
        post_id = post_id, 
        parent_comment_id = random.choice([-1, parent_comment_id]), # -1 is for root level comments (no parent)
        datetime_created = datetime.now()
        )

def generate_fake_post_tag():
    # avoid duplicates
    is_duplicate = True
    while is_duplicate:
        post_tag = PostTag(
            post_id = random.choice(Post.query.all()).id,
            tag_id = random.choice(Tag.query.all()).id,
            )
        if PostTag.query.filter_by(post_id = post_tag.post_id, tag_id = post_tag.tag_id).first():
            is_duplicate = False
    return post_tag


def generate_fake_playlist_post():
    # avoid duplicates
    is_duplicate = True
    while is_duplicate:    
        playlist_post = PlaylistPost(
            playlist_id = random.choice(Playlist.query.all()).id,
            post_id = random.choice(Post.query.all()).id,
            )
        if PlaylistPost.query.filter_by(post_id = playlist_post.post_id, playlist_id = playlist_post.playlist_id).first():
            is_duplicate = False
    return playlist_post


# Main function to seed the database
def seed_database():
    with app.app_context():
        # delete all entries in the database
        for i in (User.query.all() + Post.query.all() + Tag.query.all() + Comment.query.all() + Playlist.query.all() + PostTag.query.all() + PlaylistPost.query.all()):
            db.session.delete(i)
        db.session.commit()

        # generate new users
        for i in range(5):
            user = generate_fake_user()
            db.session.add(user)
        db.session.commit()

        # generate new posts
        for i in range(10):
            post = generate_fake_post()
            db.session.add(post)
        db.session.commit()

        # generate new tags
        for i in range(12):
            tag = generate_fake_tag()
            db.session.add(tag)
        db.session.commit()

        # generate new comments
        for i in range(40):
            comment = generate_fake_comment()
            db.session.add(comment)
            # commit comments one at a time to generate replies to comments
            db.session.commit()
        
        #generate new playlists
        for i in range(5):
            playlist = generate_fake_playlist()
            db.session.add(playlist)
        db.session.commit()

        # add tags to posts
        for i in range(30):
            post_tag = generate_fake_post_tag()
            db.session.add(post_tag)
            # commit one at a time to avoid making duplicates
            db.session.commit()

        # add posts to playlists
        for i in range(20):
            playlist_post = generate_fake_post_tag()
            db.session.add(playlist_post)
            # commit one at a time to avoid making duplicates
            db.session.commit()


   
    
if __name__ == "__main__":
    seed_database()