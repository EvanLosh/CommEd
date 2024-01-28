from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import User, db 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r'/*': {"origins": "*"}})
# configure the database connection to the local file app.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# configure flag to disable modification tracking and use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)


if __name__ == "__main__":
    app.run(debug=True)