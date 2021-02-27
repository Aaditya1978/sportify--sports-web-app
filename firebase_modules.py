# Importing required libraries
import pyrebase
from firebase import firebase
from dotenv import load_dotenv
import os


# Loading enviroment variables
load_dotenv()


# Configuration Key Of firebase
firebaseConfig = {"apiKey": os.getenv("FIREBASE_APIKEY"),
                "authDomain": os.getenv("FIREBASE_AUTHDOMAIN"),
                "databaseURL": os.getenv("FIREBASE_DATABASEURL"),
                "projectId": os.getenv("FIREBASE_PROJECTID"),
                "storageBucket": os.getenv("FIREBASE_STORAGEBUCKET"),
                "messagingSenderId": os.getenv("FIREBASE_messagingSenderId"),
                "appId": os.getenv("FIREBASE_appId"),
                "measurementId": os.getenv("FIREBASE_measurementId")}


# Init of Pyrebase
pirebase = pyrebase.initialize_app(firebaseConfig)
auth = pirebase.auth()


# Init of Firebase
firebase = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)



def firebase_user_registerer(name, email, password):

    """Gets and register a new user data to firebase

    Parameters
    ----------
    name : str
        The name of user
    email : str
        The email of user
    password : str
        The password given by user

    Returns
    -------
    None
    """

    user = auth.create_user_with_email_and_password(email, password)
    Data = {
        'Name' :  name,
        'Email' : email,
    }

    result = firebase.post('/Users:', Data)



def firebase_user_checker(email):

    """Checks if a email is already registered or not

    Parameters
    ----------
    email : str
        The email of user

    Returns
    -------
    bool
        True / Flase if user is already registered or not
    """

    data_list = firebase.get('/',None)
    flag = 0
    try:
        for data in data_list['Users:']:
            if data_list['Users:'][data]['Email'] == str(email):
                flag = 1
                break
        return flag
    except:
        return 0



def firebase_user_loger(email, password):

    """Logs in a user if email amd password are correct

    Parameters
    ----------
    email : str
        The email of user
    password : str
        The password given by user

    Returns
    -------
    bool
        True / Flase if email amd password are correct or not
    """

    try:
        login = auth.sign_in_with_email_and_password(email, password)
        return 1
    except:
        return 0



def firebase_data_fetcher(email):

    """Gets User data as per given email

    Parameters
    ----------
    email : str
        The email of user

    Returns
    -------
    dict
        A dictionary containing user data - name,email.
    """

    data_list = firebase.get('/',None)
    user_data = {}
    for data in data_list['Users:']:
        if data_list['Users:'][data]['Email'] == str(email):
            user_data['name'] = data_list['Users:'][data]['Name']
            user_data['email'] = data_list['Users:'][data]['Email']
            break
    return user_data