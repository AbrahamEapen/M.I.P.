# Dependencies
from flask import Flask, request
from flask_pymongo import PyMongo
import requests

# Flask Setup
app = Flask(__name__)

# Connect to Heroku Platform
app.config['MONGO_DBNAME'] = 'heroku_3wsrc7xm'
app.config['MONGO_URI'] = 'mongodb://docsnoop:princeton@ds033196.mlab.com:33196/heroku_3wsrc7xm'

# URL Request
r = requests.get('https://data.nasa.gov/resource/gh4g-9sfh.json')

# Instantiate the Database Connection
mongo = PyMongo(app)

# URL Request from  Mongo Database
@app.route('/upload')
def add():
   meteorite = mongo.db.meteorite
   meteorite.insert(r)
   return 'Initial Upload!'

# Default App Settings
if __name__ == '__main__':
    app.run(debug=True)