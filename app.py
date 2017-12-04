import pandas as pd 
import numpy as np

from flask import Flask, jsonify, render_template
app = Flask(__name__)

df = pd.read_json("https://data.nasa.gov/resource/y77d-th95.json")

@app.route("/")
def index():
    """Return the homepage."""
    return render_template('indexTest.html')


@app.route('/data')
def data():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    data = [{
        "lat": df['reclat'].values.tolist(),
        "long": df['reclong'].values.tolist()
    }]

    
    return jsonify(data)
    

    # Return a list of the column names (sample names)
   # return jsonify(list(df))

if __name__ == "__main__":
    app.run(debug=True)