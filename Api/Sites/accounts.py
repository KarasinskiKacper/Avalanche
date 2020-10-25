from flask import Flask
from flask_restful import Resource,Api,reqparse
import mysql.connector
from Sites import manage

#Creating, listing, deleting accounts
class Account(Resource):
    def get(self):
        mydb,mycursor = manage.connect_to_db()

        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=False)
        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            if(args['username']==None):
                data=manage.list_records()
            else:
                mycursor.execute('SELECT username,password,email FROM Konta where username=\'{}\''.format(args['username']))
                data={}
                for x in mycursor:
                    data.update(x)
                if(data=={}):
                    return {'message':'Uzytkownik nie istnieje'}

            return data
        else:
            return {'message':'Niepoprawny access token'}
    
    def post(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        parser.add_argument('email', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            for login in manage.list_records():
                if(login == args['username']):
                    return {'message':'Uzytkownik juz istnieje'}
            
            if(args['email'] in manage.list_records(type='email')):
                return {'message':'Email jest juz zajety'}

            password = manage.hash_password(args['password'])

            mycursor.execute('INSERT INTO `Konta` (`username`, `password`,`email`) VALUES (\'{}\', \'{}\',\'{}\');'.format(args['username'],password,args['email']))
            mydb.commit()
            return {'message':'Zarejestrowano'}
        else:
            return {'message':'Niepoprawny access token'}
            
    def delete(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)
        
        args = parser.parse_args()
        
        if(manage.check_token(args['token'])):
            try:
                mycursor.execute('DELETE FROM Konta where username = \'{}\''.format(args['username']))
                mydb.commit()
                return {'message':'Usunieto','username:':args['username']}
            except:
                return {'message':'Nie udalo sie usunac uzytkownika'}
        else:
            return {'message':'Niepoprawny access token'}

#Modificate accounts
class UpdateAccount(Resource):
    def post(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('type', required=True)
        parser.add_argument('username', required=True)
        parser.add_argument('new', required=True)
        parser.add_argument('password', required=True)

        args = parser.parse_args()


        if(manage.check_token(args['token'])):

            if(args['username'] not in manage.list_records()):
                return {'message':'Uzytkownik nie istnieje'}

            if(manage.hash_password(args['password']) != manage.get_password(args['username'])):
                return {'message':'Niepoprawne hasło'}

            if(args['type']=='username'):
                for login in manage.list_records():
                    if(login == args['new']):
                        return {'message':'Nazwa jest zajęta'}
                mycursor.execute('SELECT id FROM Konta WHERE username = \'{}\''.format(args['username']))
                for x in mycursor:
                    user_id=x
                mycursor.execute('UPDATE `Konta` SET username = \'{}\' WHERE id = \'{}\''.format(args['new'],user_id['id']))
                mydb.commit()
                return {'message':'Zmieniono nazwe uzytkownika','id:':user_id['id']}

            if(args['type']=='password'):
                mycursor.execute('UPDATE `Konta` SET password = \'{}\' WHERE username = \'{}\''.format(manage.hash_password(args['new']),args['username']))
                mydb.commit()
                return {'message':'Zmieniono haslo uzytkownika','username:':args['username']}
            
            if(args['type']=='email'):
                if(args['new'].upper() in manage.list_records(type='email',upper=True)):
                    return {'message':'Email jest juz zajety'}
                mycursor.execute('UPDATE `Konta` SET email = \'{}\' WHERE username = \'{}\''.format(args['new'],args['username']))
                mydb.commit()
                return {'message':'Zmieniono email uzytkownika','username:':args['username']}
        else:
            return {'message':'Niepoprawny access token'}

#Login and password check       
class Login(Resource):
    def post(self):
        mydb,mycursor = manage.connect_to_db()
        parser = reqparse.RequestParser()

        parser.add_argument('token', required=True)
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)

        args = parser.parse_args()

        if(manage.check_token(args['token'])):
            if(args['username'] not in manage.list_records()):
                return {"message":"Błędna nazwa użytkownika lub hasło"}
            mycursor.execute('SELECT password FROM `Konta` WHERE username = \'{}\''.format(args['username']))
            for x in mycursor:
                user_password = x['password']
            password = manage.hash_password(args['password'])
            if(user_password==password):
                return {'password':user_password==password}
            else:
                return {'message':"Błędna nazwa użytkownika lub hasło"}
            
        else:
            return {"message":"Niepoprawny access token"}
