# Importing Flask Libraries
from flask import Flask, render_template,request,jsonify ,session, redirect,url_for
from firebase_modules import firebase_user_registerer, firebase_user_checker, firebase_user_loger,firebase_data_fetcher
from news import sports_news_headline
from cricket import live_matches, previous_matches
from dotenv import load_dotenv
from datetime import date
import os



# Loading enviroment variables
load_dotenv()


# Init flask app
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")


# Route for home page i.e. Language Selection Page
@app.route('/')
def home():
    return render_template('home.html',error=False)


# Route for Getting Signup Data
@app.route('/signup', methods = ['POST'])
def signup():

    # Request method post to recieve data
    if request.method == 'POST':
        # Request the input data
        name =  request.form['name']
        email = request.form['signup_email']
        password = request.form['signup_password']
        if firebase_user_checker(email=email):
            return render_template('home.html',error='sign')
        else:
            firebase_user_registerer(name=name,email=email,password=password)
            session['email'] = email
            return redirect(url_for('sportify'))


# Route for Getting login Data
@app.route('/login', methods = ['POST'])
def login():

    # Request method post to recieve data
    if request.method == 'POST':
        # Request the input data
        email = request.form['login_email']
        password = request.form['login_password']
        if firebase_user_loger(email=email,password=password):
            session['email'] = email
            return redirect(url_for('sportify'))
        else:
            return render_template('home.html',error='log')


# Route for Getting to main page
@app.route('/sportify', methods = ['GET'])
def sportify():

    # Request method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        cricket_news = sports_news_headline(sports='cricket',country='in')
        football_news = sports_news_headline(sports='football',country='in')
        basketball_news = sports_news_headline(sports='basketball',country='us')
        return render_template('main.html', user_data=user_data, basketball_news=basketball_news,
                                cricket_news=cricket_news, football_news=football_news)


# Route for Getting to cricket page
@app.route('/cricket', methods = ['GET'])
def cricket():

    # Request method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        matches = live_matches()
        return render_template('cricket.html', user_data=user_data, matches=matches, date=date.today())


# Route for Getting to cricket page
@app.route('/cricket_score', methods = ['POST'])
def cricket_score():

    # Request method GET
    if request.method == 'POST':
        email = session['email']
        matchid = request.form['matchid']
        seriesid = request.form['seriesid']
        user_data = firebase_data_fetcher(email=email)
        matches = live_matches()
        return jsonify({'res':matchid})


# Route for Getting to cricket page
@app.route('/previous_cricket', methods = ['GET'])
def previous_cricket():

    # Request method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        matches = previous_matches()
        return render_template('previous_cricket.html', user_data=user_data, matches=matches)




# Running the Flask App
if __name__ == "__main__":

    #running application
    app.run(debug=True)
