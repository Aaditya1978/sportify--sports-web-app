# Importing required libraries
from newsapi import NewsApiClient
from dotenv import load_dotenv
import os


# Loading enviroment variables
load_dotenv()


# Init news api client
newsapi = NewsApiClient(api_key=os.getenv("NEWS_API"))


def sports_news_headline(sports, country) -> dict:

    """Gets latest news headlines for the given sports

    Parameters
    ----------
    sports:
        The sports for which top news headlines are to be fetched

    country:
        The coutry from which the news headlines are to be fetched

    Returns
    -------
    dict:
        A Dictionary of latest news headlines for the given sports
    """

    top_headlines = newsapi.get_top_headlines(q= str(sports),
                                            category='sports',
                                            language='en',
                                            country=str(country))

    return top_headlines
