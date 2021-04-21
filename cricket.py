# Importing required libraries
import requests
import cricapi
from dotenv import load_dotenv
import os


# Loading enviroment variables
load_dotenv()

# Setting Cricapi key
cric = cricapi.Cricapi(os.environ.get('CRIC_APIKEY'))


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

    url = os.environ.get("CRICKET_LIVE_URL")
    r = requests.get(url)
    live = r.json()

    matches = []

    for i in live["content"]["matches"]:

        datas = {}

        if (i["coverage"] == "Y" or i["coverage"] == "U") and  i["state"] == "LIVE":
            datas['matchId'] = i['objectId']
            datas['seriesId'] = i['series']['objectId']
            datas['match_name'] = i['slug']
            datas['status'] = i['statusText']
            datas['series_name'] = i['series']['longName']
            datas['stadium'] = i['ground']['longName']
            datas['format'] = i['format']
            matches.append(datas)

    return matches



def previous_matches():

    """Return list of the previous matches

    Parameters
    ----------
    None

    Returns
    -------
    list
        a list of previous matches
    """

    url = os.environ.get("CRICKET_PREVIOUS_URL")
    r = requests.get(url)
    previous = r.json()

    matches = []

    for i in previous["content"]["matches"]:

        datas = {}

        if (i["coverage"] == "Y" or i["coverage"] == "U"):
            datas['matchId'] = i['objectId']
            datas['seriesId'] = i['series']['objectId']
            datas['match_name'] = i['slug']
            datas['status'] = i['statusText']
            datas['series_name'] = i['series']['longName']
            datas['stadium'] = i['ground']['longName']
            datas['format'] = i['format']
            datas['date'] = i['startDate']
            matches.append(datas)

    return matches



def cricket_team():
    """Return list of all the cricket teams

    Parameters
    ----------
    none

    Returns
    -------
    list:
        A list of all the teams
    """

    url = os.environ.get("CRICKET_TEAMS_URL")
    r = requests.get(url)
    teams = r.json()

    return teams['content']['popularTeams']



def cricket_search_by_name(name):
    """Returns searched list of the cricket players by that name

    Parameters
    ----------
    name: str
        name of the player to be searched

    Returns
    -------
    list:
        A list of all the searched cricket players
    """
    try:
        result = cric.playerFinder({'name':name})
        if not result['data']:
            return "not found"
        else:
            return result['data']
    except:
        return "not found"



def cricket_search_by_id(id):
    """Returns searched list of the cricket players by that id

    Parameters
    ----------
    id: str
        id of the player to be searched

    Returns
    -------
    dict:
        A dict of all the data of searched cricket player
    """
    try:
        result = cric.playerStats({'pid':int(id)})
        return result
    except:
        return "not found"



def match_score_live(series_id, match_id):
    """Return all the data of given live match

    Parameters
    ----------
    match_id : int
        unique id of that match
    series_id : int
        series id of the match

    Returns
    -------
    dict
        live match score of the given match id and series id
    """

    url = os.environ.get("CRCIKET_SCORE_LIVE_URL")
    r = requests.get(url + "seriesId=" + str(series_id) + "&matchId=" + str(match_id))
    score = r.json()

    return score



def match_score_previous(series_id, match_id):
    """Return all the data of given previous match

    Parameters
    ----------
    match_id : int
        unique id of that match
    series_id : int
        series id of the match

    Returns
    -------
    dict
        scorecard of the given match id and series id
    """

    url = os.environ.get("CRICKET_SCORE_PREVIOUS_URL")
    r = requests.get(url + "seriesId=" + str(series_id) + "&matchId=" + str(match_id))
    score = r.json()

    return score



def team_data(team_id):
    """Return all the data of given previous match

    Parameters
    ----------
    team_id : int
        unique id of that team

    Returns
    -------
    dict
        data of the given team id
    """

    url = os.environ.get("CRICKET_TEAMS_FIND_URL")
    r = requests.get(url + str(team_id))
    data = r.json()

    return data
