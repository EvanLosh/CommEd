from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, backref
import bcrypt

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(1000), nullable=False)
    email_is_verified = db.Column(db.Boolean, nullable=False)
    datetime_created = db.Column(db.DateTime, nullable=False)
    
    serialize_rules = (
        "-posts.owner",  
        '-posts.tags',
        '-posts.comments', 
        '-posts.post_tags', 
        '-posts.problem_body',
        '-posts.answer_body',
        '-posts.solution_body',
        '-posts.references',
        '-posts.playlist_posts', 
        '-posts.comments',
        '-comments', 
        '-playlists.posts.owner', 
        '-playlists.posts.tags',
        '-playlists.owner',
        '-playlists.posts.owner',
        '-playlists.playlist_posts',
        '-playlists.owner_id',
        '-playlists.datetime_created',
        '-playlists.datetime_last_edited')
    
    def __repr__(self):
        return f'User(id={self.id}, username={self.username})'

    @validates('username')
    def validate_username(self, key, value):
        if not value:
            raise ValueError('Invalid username')
        if 1 > len(value) > 20:
            raise ValueError('Username length must be between 1 and 20 characters')
        if ',' in value or '\\' in value or '/' in value or ';' in value or "{" in value or "}" in value:
            return ValueError('Usernames cannot contain commas, semicolons, slashes, and brackets')
        return value
    
    @validates('password_hash')
    def validate_password(self, key, value):
        if not value:
            raise ValueError('Password hash cannot be empty')
        # if 1 > len(value) > 20:
        #     raise ValueError('Password length must be between 1 and 20 characters')
        # if ',' in value or '\\' in value or '/' in value or ';' in value or "{" in value or "}" in value:
        #     return ValueError('Passwords cannot contain commas, seimcolons, slashes, and brackets')
        return value

    @validates('email')
    def validate_email(self, key, value):
        if not value:
            raise ValueError('Invalid email')
        elif (5 > len(value) > 1000):
            raise ValueError('Email must have 5 to 1000 characters')
        elif ('@' not in value):
            raise ValueError('Emails must contain @')
        elif ('.' not in value):
            raise ValueError('Emails must contain .')
        elif ',' in value or '\\' in value or '/' in value:
            return ValueError('Emails cannot contain commas and slashes')
        return value
    
    def verify_password(self, password):
        password_bytes = password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, self.password_hash)
    
class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150))
    problem_body = db.Column(db.String(10000))
    answer_body = db.Column(db.String(10000))
    solution_body = db.Column(db.String(10000))
    references  = db.Column(db.String(10000))
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime)
    status = (db.Column(db.String(100))) # draft / published / hidden

    owner = db.relationship('User', backref="posts")
    tags = db.relationship('Tag', secondary='post_tags', back_populates="posts")

    serialize_rules = (
        '-owner.posts',
        '-owner.playlists',
        '-owner.comments',
        '-owner.datetime_created',
        '-owner.email',
        '-tags.posts',
        '-tags.datetime_created',
        '-playlists',
        '-comments.post',
        '-comments.parent_id',
        '-comments.owner_id',
        '-comments.owner.email',
        '-comments.owner.datetime_created',
        '-comments.parent', 
        '-comments.post_id',
        )

    def __repr__(self):
        return f'Post(id={self.id} owner_id={self.owner_id} title={self.title})'
    
    @validates('owner_id')
    def validate_owner_id(self, key, value):
        if value > 0:
            return value
        else: 
            raise ValueError('Invalid owner id')
        
    @validates('status')
    def validate_status(self, key,value):
        # status can have only two values
        if (value == 'draft') or (value == 'published') or (value == None):
            return value
        else: 
            raise ValueError('Status can only be draft or published')
    
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(10000))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    parent_id = db.Column(db.Integer,  db.ForeignKey('comments.id'))
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime)
    status = (db.Column(db.String(100))) # draft / published / hidden

    owner = db.relationship('User', backref='comments')
    post = db.relationship('Post', backref='comments')
    comments = db.relationship("Comment", back_populates="parent")
    parent = db.relationship("Comment", back_populates="comments", remote_side=[id])

    serialize_rules = (
        '-owner.comments',
        '-owner.posts',
        '-owner.playlists',
        '-owner.datetime_created',
        '-owner.email',
        '-post', 
        '-children.parent',
        '-children.parent_id',
        '-children.owner_id',
        '-children.post_id',
        '-parent')



    def __repr__(self):
        return f'Comment(id={self.id} post_id={self.post_id} body={self.body})'
    
    @validates('owner_id')
    def validate_owner_id(self, key, value):
        if value > 0:
            return value
        else: 
            raise ValueError('Invalid owner id')
        
    @validates('post_id')
    def validate_post_id(self, key, value):
        # a comment must have either a post_id or a parent_id. A not-None parent_id makes the comment a child of another comment.
        if value == None:
            if self.parent_id == None:
                raise ValueError('post_id and parent_id cannot both be None')
            else:
                return value
        elif value > 0:
            if self.parent_id == None:
                return value
            else:
                raise ValueError('Comments cannot have both a post_id and a parent_id')
        else: 
            raise ValueError('Invalid post id')
        
    @validates('parent_id')
    def validate_parent_id(self, key, value):
        # a comment must have either a post_id or a parent_id. A not-None parent_id makes the comment a child of another comment.
        if value == None:
            if self.post_id == None:
                raise ValueError('post_id and parent_id cannot both be None')
            else:
                return value
        elif value > 0:
            if self.post_id == None:
                return value
            else:
                raise ValueError('Comments cannot have both a post_id and a parent_id')
        else: 
            raise ValueError('Invalid parent id')
        
    @validates('status')
    def validate_status(self, key,value):
        # status can have only two values
        if value == 'draft' or value == 'published' or value == None:
            return value
        else: 
            raise ValueError('Status can only be draft or published')
    
class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(40), nullable=False)
    datetime_created = db.Column(db.DateTime, nullable=False)


    posts = db.relationship('Post', secondary='post_tags', back_populates='tags')



    serialize_rules = ('-posts.tags',)


    def __repr__(self):
        return f'Tag(id={self.id} tag={self.text})'
    
    @validates('text')
    def validate_text(self, key, value):
        # tags must have text
        if value:
            return value
        else:
            raise ValueError('Did not receive a value for text')
    
class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150))
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime)
    status = (db.Column(db.String(100))) # draft / published / hidden

    owner = db.relationship('User', backref='playlists')

    posts = db.relationship('Post', secondary='playlist_posts', backref="playlists")
    serialize_rules = (
        '-owner.playlists', 
        '-owner.comments',
        '-owner.posts',
        '-owner.datetime_created',
        '-owner.email',
        '-posts.problem_body',
        '-posts.answer_body',
        '-posts.solution_body',
        '-posts.references',
        '-posts.comments',
        '-posts.playlists'
        '-posts.datetime_created'
        )
    
    def __repr__(self):
        return f'Playlist(id={self.id})'
    
    @validates('owner_id')
    def validate_owner_id(self, key, value):
        if value > 0:
            return value
        else: 
            raise ValueError('Invalid owner id')
        
    @validates('title')
    def validate_title(self, key, value):
        # a title is required
        if not value:
            raise ValueError('Did not recieve a value for title')
        elif len(value) < 1:
            raise ValueError('Playlist title must be a string with at least one character')
        else: 
            return value
        
    @validates('status')
    def validate_status(self, key,value):
        # status can have only two values
        if value == 'draft' or value == 'published' or value == None:
            return value
        else: 
            raise ValueError('Status can only be draft or published')
        

# post_tag table intermediates the many to many relationship between posts and tags 
post_tag = db.Table(
'post_tags', 
db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'))
)
    

# playlist_post table intermediates the many to many relationship between playlists and posts    
playlist_post = db.Table(
'playlist_posts', 
db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'))
)

