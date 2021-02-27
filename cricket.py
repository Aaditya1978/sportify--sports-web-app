# Importing required libraries
import requests
from dotenv import load_dotenv
import os


# Loading enviroment variables
load_dotenv()


def live_matches():

    """Return list of all the live matches

    Parameters
    ----------
    None

    Returns
    -------
    list
        a list of live matches
    """

    url = os.getenv("CRICKET_LIVE_URL")
    r = requests.get(url)
    live = r.json()

    matches = []

    for i in live["content"]["matches"]:

        datas = {}

        if i["coverage"] == "Y":
            datas['matchId'] = i['objectId']
            datas['seriesId'] = i['series']['objectId']
            datas['match_name'] = i['slug']
            datas['status'] = i['statusText']
            datas['toss_winner_id'] = i['tossWinnerTeamId']
            datas['toss_choice'] = i['tossWinnerChoice']
            datas['series_name'] = i['series']['longName']
            datas['stadium'] = i['ground']['longName']
            datas['format'] = i['format']
            datas['team1'] = {}
            datas['team2'] = {}
            datas['team1']['name'] = i['teams'][0]['team']['longName']
            datas['team1']['id'] = i['teams'][0]['team']['id']
            datas['team1']['object_id'] = i['teams'][0]['team']['objectId']
            datas['team1']['score'] = i['teams'][0]['score']
            datas['team1']['score_info'] = i['teams'][0]['scoreInfo']
            datas['team2']['name'] = i['teams'][1]['team']['longName']
            datas['team2']['id'] = i['teams'][1]['team']['id']
            datas['team2']['object_id'] = i['teams'][1]['team']['objectId']
            datas['team2']['score'] = i['teams'][1]['score']
            datas['team2']['score_info'] = i['teams'][1]['scoreInfo']

            matches.append(datas)

    return matches



def live_score(match_id):
    """Return list of all the live matches scores

    Parameters
    ----------
    match_id : int
        unique id of that live match

    Returns
    -------
    dict
        matche score of the given match id
    """
