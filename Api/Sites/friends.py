from flask import Flask
from flask_restful import Resource,Api,reqparse
import mysql.connector
from Sites import manage

#===Actually not deployed in app===

#Add friend
class Friend(Resource):

    def get(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            if(args['username'] not in manage.list_records()):
                return {"message":"Uzytkownik nie istnieje"}
            mycursor.execute('SELECT friends FROM Konta where username = \'{}\''.format(args['username']))
            for x in mycursor:
                data=x
            data = manage.convert_data(data)

            friends = []
            for x in data['friends']:
                friends.append(x)
            
            output=[]
            for friend in friends:
                output.append(manage.id_to_username(friend))
            return output
        else:
            return {"message":"Niepoprawny access token"}

    def post(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)
        parser.add_argument('friend', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            users = manage.list_records(upper=True)
            if(args['username'].upper() in users and args['friend'].upper() in users):
                manage.add_friend(args['username'],args['friend'])
                manage.add_friend(args['friend'],args['username'])
                return {"message":"Dodano znajomego","username":args['username'], "friend": args['friend']}
            else:
                return {"message":"Nie znaleziono uzytkownika"}

        else:
            return {"message":"Niepoprawny access token"}
    
    def delete(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)
        parser.add_argument('friend', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            if(args['username'] not in manage.list_records() or args['friend'] not in manage.list_records()):
                return {"message":"Uzytkownik nie istnieje"}
            friend = manage.username_to_id(args['friend'])
            username = manage.username_to_id(args['username'])

            status = manage.remove_friend(friend,username)
            status = manage.remove_friend(username,friend)
            
            return status

        else:
            return {"message":"Niepoprawny access token"}

#Invite friend
class Invititation(Resource):

    def get(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            if(args['username'] not in manage.list_records()):
                return {"message":"Uzytkownik nie istnieje"}
            mycursor.execute('SELECT invitations FROM Konta where username = \'{}\''.format(args['username']))
            for x in mycursor:
                data=x
            data = manage.convert_data(data, users='invitations')

            inv = []
            for x in data['invitations']:
                inv.append(x)
            
            output=[]
            for x in inv:
                output.append(manage.id_to_username(x))
            return output
        else:
            return {"message":"Niepoprawny access token"}

    def post(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)
        parser.add_argument('friend', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            users = manage.list_records(upper=True)
            if(args['username'].upper() in users and args['friend'].upper() in users):
                manage.invite_friend(args['username'],args['friend'])
                return {"message":"Zaproszono znajomego","username":args['username'], "friend": args['friend']}
            else:
                return {"message":"Nie znaleziono uzytkownika"}

        else:
            return {"message":"Niepoprawny access token"}
