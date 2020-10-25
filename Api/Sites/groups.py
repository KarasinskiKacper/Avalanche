from flask import Flask
from flask_restful import Resource,Api,reqparse
import mysql.connector
from Sites import manage

#===Actually not deployed in app===
#===Unfinished===

#Creating, listing, deleting groups  
class Group(Resource):

    def get(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])): 
            return manage.list_groups()
        else:
            return {"message":"Niepoprawny access token"}

    def post(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('group_name', required=True)
        parser.add_argument('username', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            groups = manage.list_records(upper=True,type='groups')
            if(args['group_name'].upper() not in groups):
                if(args['username'].upper() in manage.list_records(upper=True)):
                    mycursor.execute('INSERT INTO `Grupy` (`group_name`,`group_leader`) VALUES (\'{}\',\'{}\');'.format(args['group_name'],manage.username_to_id(args['username'])))
                    mydb.commit()
                    #add leader to group
                    manage.add_member(args['username'],args['group_name'])
                    return {"message":"Utworzono grupe","group_name":args['group_name'],"group_leader":args['username']}
                else:
                    return {"message":"Uzytkownik nie istnieje"}
            else:
                return {"message":"Grupa juz istnieje"}

        else:
            return {"message":"Niepoprawny access token"}
    
    def delete(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('group_name', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            if(args['group_name'].upper() in manage.list_groups(upper=True)):
                manage.remove_group(args['group_name'])
                return {"message":"Usunieto","group_name":args["group_name"]}
            else:
                return {"message":"Grupa nie istnieje"}
        else:
            return {"message":"Niepoprawny access token"}

#Adding and listing group members
class GroupMembers(Resource):
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
        parser.add_argument('group_name', required=True)
        parser.add_argument('username', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            groups = manage.list_records(upper=True,type='groups')
            if(args['group_name'].upper() in groups):
                if(args['username'].upper() in manage.list_records(upper=True)):
                    
                    manage.add_member(args['username'],args['group_name'])

                    return {"message":"Dodano do grupy","group_name":args['group_name'],"username":args['username']}
                else:
                    return {"message":"Uzytkownik nie istnieje"}
            else:
                return {"message":"Grupa juz istnieje"}

        else:
            return {"message":"Niepoprawny access token"}
  