import pandas as pd 
import numpy as np

from flask import Flask, jsonify, render_template
app = Flask(__name__)

import pymongo

# Get the json, put it into a dataframe
df = pd.read_json("https://data.nasa.gov/resource/y77d-th95.json")

# Start the MongoDB DB



@app.route("/")
def index():
    """Return the homepage."""
    return render_template('indexTest.html')


@app.route('/data')
def data():
    """Return a list of sample names."""

    ## Ideally, this should be pushing data into a mongodb database for storage and retrieval.  That would most likely have to occur on heroku (I think)
    data = [{
        "lat": df['reclat'].values.tolist(),
        "long": df['reclong'].values.tolist()
    }]
    
    return jsonify(data)
    

    ### Calculations
    # We have the mass of the meteorites, and I've  found a page that has the average mass of the the meteorites
    # With the mass and the density, I think if we assume the shape is a sphere then we can get surface area
    # Once we have the surface area then we can calculate terminal velocity
    # With terminal velocity we can calculate impact kinetic energy!
    
    
    # volume = mass/density 
    # volume = 4/3(pie)r^3
    # surface area = 4(pie)r^2
    # terminal velocity = sqrt(2mg/density*A*dragCoefficient)
    # impact energy in joules is 1/2mass * velocity^2


if __name__ == "__main__":
    app.run(debug=True)