from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

# Models 

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.VARCHAR(20), nullable=False)
    
    # serialize_rules = ()
    
    def __repr__(self):
        return f'User(id={self.id}, username={self.username})'

    @validates('username')
    def validates_username(self, key, value):
        if not value:
            raise ValueError('Invalid username')
        if len(value) > 20:
            raise ValueError('Username cannot exceed 20 characters')
        return value
