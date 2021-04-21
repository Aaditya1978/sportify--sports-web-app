# Importing Flask Libraries
from flask import Flask, render_template,request,jsonify ,session, redirect,url_for
from firebase_modules import firebase_user_registerer, firebase_user_checker, firebase_user_loger,firebase_data_fetcher
from news import sports_news_headline
from cricket import live_matches, previous_matches, cricket_team, cricket_search_by_name,cricket_search_by_id, match_score_live, match_score_previous, team_data
from dotenv import load_dotenv
from datetime import date
import os
import smtplib



# Loading enviroment variables
load_dotenv()


# Init flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")


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



# Route for Getting to Previous cricket matches page
@app.route('/previous_cricket', methods = ['GET'])
def previous_cricket():

    # Request method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        matches = previous_matches()
        return render_template('previous_cricket.html', user_data=user_data, matches=matches)


# Route for Getting to cricket teams page
@app.route('/cricket_teams', methods = ['GET'])
def cricket_teams():

    # Request method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        teams = cricket_team()
        return render_template('cricket_teams.html', user_data=user_data, teams=teams)



# Route for Getting to player info page
@app.route('/player', methods = ['GET'])
def player():

    # Request method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        return render_template('player_info.html', user_data=user_data)



# Route for Getting player list info
@app.route('/search_player', methods = ['POST'])
def search_player():

    # Request method POST
    if request.method == 'POST':
        name = request.form['name']
        players = cricket_search_by_name(name)
        return jsonify({'players':players})



# Route for Getting to player info by id
@app.route('/search_player_id', methods = ['POST'])
def search_player_id():

    # Request method POST
    if request.method == 'POST':
        id = request.form['id']
        player = cricket_search_by_id(id)
        return jsonify(player)



# Route for Getting live match score
@app.route('/match_live', methods = ['POST'])
def match_live():

    # Request method GET
    if request.method == 'POST':
        email = session['email']
        seriesId = request.form['get_det']
        matchId = request.form['get_details']
        user_data = firebase_data_fetcher(email=email)
        score = match_score_live(seriesId,matchId)
        return render_template('match_score_live.html', user_data=user_data, score=score)



# Route for Getting live match score using ajax
@app.route('/match_live_ajax', methods = ['POST'])
def match_live_ajax():

    # Request method POST
    if request.method == 'POST':
        seriesId = request.form['seriesId']
        matchId = request.form['matchId']
        score = match_score_live(seriesId,matchId)
        return jsonify(score)



# Route for Getting live match score
@app.route('/match_previous', methods = ['POST'])
def match_previous():

    # Request method GET
    if request.method == 'POST':
        email = session['email']
        seriesId = request.form['get_det']
        matchId = request.form['get_details']
        user_data = firebase_data_fetcher(email=email)
        score = match_score_previous(seriesId,matchId)
        return render_template('match_score_previous.html', user_data=user_data, score=score)



# Route for Getting team page
@app.route('/team', methods = ['POST'])
def team():

    # Request method POST
    if request.method == 'POST':
        email = session['email']
        team_id = request.form['team_id']
        user_data = firebase_data_fetcher(email=email)
        data = team_data(team_id=team_id)
        return render_template('team.html', user_data=user_data,data=data)



# Route for getting to football Page
@app.route('/football', methods = ['GET'])
def football():

    # Request Method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        return render_template('football.html', user_data=user_data)



# Route for getting to football Page
@app.route('/basketball', methods = ['GET'])
def basketball():

    # Request Method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        return render_template('basketball.html', user_data=user_data)



# Route for subscribing to updates
@app.route('/subscribe', methods = ['GET'])
def subscribe():

    # Request Method GET
    if request.method == 'GET':
        email = session['email']
        user_data = firebase_data_fetcher(email=email)
        name = user_data['name']
        message = "You have subscribed to get latest updates for Sportify"
        message2 = name + " has subcribed to our Sportify updates."
        try:
            server = smtplib.SMTP("smtp.gmail.com",587)
            server.starttls()
            server.login(os.environ.get("EMAIL"),os.environ.get("PASSWORD"))
            server.sendmail(os.environ.get("EMAIL"),email, message)
            server.sendmail(os.environ.get("EMAIL"),os.environ.get("EMAIL"), message2)
            return jsonify("success")
        except:
            return jsonify("error")



# Running the Flask App
if __name__ == "__main__":

    #running application
    app.run(debug=False)
