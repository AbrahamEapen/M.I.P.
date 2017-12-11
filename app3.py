# Dependencies
# ------------
from flask import Flask, request, jsonify
import requests
import os
from pymongo import MongoClient
import json
import requests

# Flask Setup
# ------------------
app = Flask(__name__)

# MONGO_CON = os.environ.get(MONGO_URI)
# ---------------------------------------

# Create db connection
# --------------------
client = MongoClient('mongodb://docsnoop:princeton@ds033196.mlab.com:33196/heroku_3wsrc7xm')


# Create a database
# -------------------------
db = client.heroku_3wsrc7xm

# Create a collection
# --------------------------------
new_collection = db.new_collection

# URL Request
# ---------------------------------------------------------------
r = requests.get('https://data.nasa.gov/resource/gh4g-9sfh.json')
meteors = r.json()


# print(json_met[0]["reclat"])

# Dictionaries
# ----------------------------------------

# Basic Meteor List
meteor_list = []
# meteor_dict = {"Lat": r[reclat]}
for meteor in meteors:
    try:
        meteor_dict = {"Name": meteor["name"],
                       "Lat": meteor["reclat"],
                       "Long": meteor["reclong"],
                       "Mass": meteor["mass"]}
    except KeyError:
        # meteor_dict = {"Name": meteor["name"],
        #                "Lat": meteor["reclat"],
        #                "Long": meteor["reclong"],
        #                "Mass": "N/A"}
        pass
    meteor_list.append(meteor_dict)
    #print(meteor_list)

# Surface Area
# Surface Area = 4(pie)r^2
surfacearea_list = []
for surfacearea in surfaceareas:
	try:
		surfacearea_dict = {"": [],
							"": [],
							"": [],
							"": [],
							"": []}
	except KeyError:
		# surfacearea_dict = {"": [],
		#					  "": [],
		#					  "": [],
		#					  "": []}
		pass
	surfacearea_list.append(surfacearea_dict)
	#print(surfacearea_list)

# Terminal Velocity
# Terminal Velocity = sqrt(2mg/density*A*dragCoefficient)
velocity_list = []
for velocity in velocities:
	try:
		velocity_dict = {"":[],
						 "":[],
						 "":[],
						 "":[],
						 "":[],}
	except KeyError:
		# velocity_dict = {"":[],
		#				   "":[],
		#                  "":[], 
		#                  "":[],}
		pass
	velocity_list.append(velocity_dict)
	#print(velocity_list)

# Impact Radius
# Impact Energy(Joules) = 1/2mass * velocity^2
impact_radius = []
for impact in impacts:
	try:
		impact_dict = {"":[],
						 "":[],
						 "":[],
						 "":[],
						 "":[],}
	except KeyError:
		# impact_dict = {"":[],
		#				 "":[],
		#				 "":[],
		#                "":[],
		#                "":[],}
		pass
	impact_list.append(impact_dict)
	#print(impact_list)

# API NETWORK
# --------------------------------------------------------------------
# API ROUTE(/UPLOAD) [URL Request from  Nasa Data API to Mongo Database]
@app.route('/upload')
def add():
    # meteorite = mongo.db.meteorite
    # meteorite.insert(r)
    return 'Initial Upload!'

# API ROUTE(/test)[test route with all data columns]
@app.route('/test')
def test():
    return jsonify(meteor_list)

# API ROUTE(/surfacearea)[calculation route for surface area]
@app.route('/surfacearea')
def surfacearea():
	return jsonify(surfacearea_list)

# API ROUTE(/velocity)[calculation route for terminal velocity]
@app.route('/velocity')
def velocity():
	return jsonify(velocity_list)

# API ROUTE(/impact)[calculation route for impact]
@app.route('/impact')
def impact():
	return jsonify(impact_list)

# API ROUTE(/volume)[calculation route for ]
@app.route volume('/volume'):
def volume():
	return jsonify(volume_list)

# API ROUTE(/coordinates)[direct route for coordinates(lats/longs)]
@app.route('/coordinates')
def coordinates():
	coordinate = [{
			"lat": df['reclat'].values.tolist(),
			"long": df['reclong'].value.tolist()
	}]
	return jsonify(coordinate)

# Default App Settings
if __name__ == '__main__':
   app.run(debug=True)