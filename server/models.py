from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, backref

db = SQLAlchemy()

# Models 

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
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
    def validates_username(self, key, value):
        if not value:
            raise ValueError('Invalid username')
        if len(value) > 20:
            raise ValueError('Username cannot exceed 20 characters')
        return value
    
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
        # '-owner_id',
        '-owner.datetime_created',
        '-owner.email',
        '-tags.posts',
        '-tags.datetime_created',
        '-playlists',
        '-comments.post',
        '-comments.parent_id',
        '-comments.owner_id',
        # '-comments.owner.id',
        '-comments.owner.email',
        '-comments.owner.datetime_created',
        '-comments.parent', 
        '-comments.post_id',
        )

    def __repr__(self):
        return f'Post(id={self.id} owner_id={self.owner_id} title={self.title})'
    
    @validates('owner_id')
    def validate_owner_id(slef, key, value):
        if value > 0:
            return value
        else: 
            raise ValueError('Invalid owner id')
    
    
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
  
    
class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(40))
    datetime_created = db.Column(db.DateTime, nullable=False)


    posts = db.relationship('Post', secondary='post_tags', back_populates='tags')



    serialize_rules = ('-posts.tags',)


    def __repr__(self):
        return f'Tag(id={self.id} tag={self.text})'
    
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
        # '-posts.id',
        # '-posts.owner_id',
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
    
post_tag = db.Table(
'post_tags', 
db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'))
)
    
# class PostTag(db.Model, SerializerMixin):
#     __tablename__ = 'post_tags'

#     id = db.Column(db.Integer, primary_key=True)
#     post_id = db.Column(db.Integer,  db.ForeignKey('posts.id'), nullable=False)
#     tag_id = db.Column(db.Integer,  db.ForeignKey('tags.id'), nullable=False)

#     serialize_rules = (
#         '-post.post_tags', 
#         '-post.owner',
#         '-post.comments',
#         '-post.playlist_posts',
#         '-tag.post_tags')

#     def __repr__(self):
#         return f'Post_tag(id={self.id})'
    
playlist_post = db.Table(
'playlist_posts', 
db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'))
)

# class PlaylistPost(db.Model, SerializerMixin):
#     __tablename__ = 'playlist_posts'

#     id = db.Column(db.Integer, primary_key=True)
#     post_id = db.Column(db.Integer,  db.ForeignKey('posts.id'), nullable=False)
#     playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'),  nullable=False)

#     serialize_rules = (
#         # '-post.post_tags', 
#         # '-post.owner',
#         '-post.comments',
#         '-post.playlist_posts', 
#         '-playlist.owner'
#         '-playlist.playlist_posts')

    # def __repr__(self):
    #     return f'Playlist_post(id={self.id})'