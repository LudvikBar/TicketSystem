from flask import Flask, render_template
import pymysql


app = Flask(__name__)



@app.route("/")
def index():
   return render_template("index.html")

@app.route("/kunde")
def game_page():
    return render_template("kundeside.html")



app.run(host="0.0.0.0", port=5000)