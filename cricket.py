# Importing required libraries
import requests
import cricapi
from dotenv import load_dotenv
import os


# Loading enviroment variables
load_dotenv()

# Setting Cricapi key
cric = cricapi.Cricapi(os.getenv('CRIC_APIKEY'))


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

    url = os.getenv("CRICKET_PREVIOUS_URL")
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

    url = os.getenv("CRICKET_TEAMS_URL")
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
