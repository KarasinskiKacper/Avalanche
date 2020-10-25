import mysql.connector
import ast
import hashlib 

token='10c15a41094124737263dd77ac96dcb5'

def connect_to_db():
    mydb = mysql.connector.connect(
            host="remotemysql.com",
            user="XXuZ0wy1oV",
            password="9QxKzBgnLE",
            database="XXuZ0wy1oV"
        )
    mycursor = mydb.cursor(dictionary=True)

    return mydb,mycursor

def hash_password(password):
    password = hashlib.md5(password.encode())
    return password.hexdigest()

def list_records(upper=False,type='users'):
    mydb,mycursor = connect_to_db()
    if(type=='users'):
        mycursor.execute('SELECT username FROM Konta')
        data=[]
        if(upper):
            for x in mycursor:
                data.append(x['username'].upper())
        else:
            for x in mycursor:
                data.append(x['username'])
        return data
    if(type=='groups'):
        mycursor.execute('SELECT group_name FROM Grupy')
        data=[]
        if(upper):
            for x in mycursor:
                data.append(x['group_name'].upper())
        else:
            for x in mycursor:
                data.append(x['group_name'])
        return data
    if(type=='email'):
        mycursor.execute('SELECT email FROM Konta')
        data=[]
        if(upper):
            for x in mycursor:
                data.append(x['email'].upper())
        else:
            for x in mycursor:
                data.append(x['email'])
        return data

def check_token(argument):
    if(argument!=token):
        return False
    else:
        return True

def convert_data(data,users='friends'):
    if(data[users]==None):
        data="{\""+users+"\":[]}"
    else:
        data=data[users]
    data = ast.literal_eval(data)
    return data

def id_to_username(id):
    mydb,mycursor = connect_to_db()
    mycursor.execute('SELECT username FROM Konta where id = \'{}\''.format(id))
    for x in mycursor:
        output = x['username']
    return output

def username_to_id(username):
    mydb,mycursor = connect_to_db()
    mycursor.execute('SELECT id FROM Konta where username = \'{}\''.format(username))
    for x in mycursor:
        output = x['id']
    return output

def add_friend(username,friend):
    mydb,mycursor = connect_to_db()
    mycursor.execute('SELECT id FROM Konta where username = \'{}\''.format(friend))
    for x in mycursor:
        user_id=x
    mycursor.execute('SELECT friends FROM Konta where username = \'{}\''.format(username))
    for x in mycursor:
        data=x
    
    data = convert_data(data)

    if(int(user_id['id']) in data["friends"]):
        print('Already exists')
    else:
        data["friends"].append(int(user_id['id']))
        data = str(data)
        mycursor.execute('UPDATE `Konta` SET `friends` = (\'{}\') WHERE username=\'{}\''.format(data.replace('\'','"'),username))
        mydb.commit()

def remove_friend(username,friend):
    mydb,mycursor = connect_to_db()
    mycursor.execute('SELECT friends FROM Konta where id = \'{}\''.format(username))
    for x in mycursor:
        input_data=x
    try:
        input_data = convert_data(input_data)
    except:
        return {'message':'Zla nazwa uzytkownika'}
    data = input_data['friends']

    itemCount = 0
    for x in range(len(data)):
        if(data[x]==friend):
            itemCount+=1

    for x in range(itemCount):
        data.remove(friend)

    input_data['friends']=data

    output = str(input_data)
    mycursor.execute('UPDATE `Konta` SET `friends` = (\'{}\') WHERE id=\'{}\''.format(output.replace('\'','"'),username))
    mydb.commit()
    return {'message':'Usunieto','friend:':id_to_username(friend)}

def list_groups(upper=False):
    mydb,mycursor = connect_to_db()
    mycursor.execute('SELECT group_name FROM Grupy')
    data = []
    if(upper):
        for x in mycursor:
            data.append(x['group_name'].upper())
    else:
        for x in mycursor:
            data.append(x['group_name'])
    return data

def remove_group(group_name):
    mydb,mycursor = connect_to_db()

    mycursor.execute('DELETE FROM Grupy where group_name = \'{}\''.format(group_name))
    mydb.commit()

def list_members(group_name):
    mydb,mycursor = connect_to_db()

    mycursor.execute('SELECT members FROM Grupy where group_name = \'{}\''.format(group_name))
    for x in mycursor:
        data=x

    return convert_data(data,users='members')

def add_member(username,group_name):
    mydb,mycursor = connect_to_db()

    members = list_members(group_name)

    if(username_to_id(username) in members):
        print('Already exists')
    else:
        members["members"].append(username_to_id(username))
        members = str(members)
        mycursor.execute('UPDATE `Grupy` SET `members` = (\'{}\') WHERE group_name=\'{}\''.format(members.replace('\'','"'),group_name))
        mydb.commit()

def remove_member(username,group_name):
    mydb,mycursor = connect_to_db()
    mycursor.execute('SELECT friends FROM Konta where id = \'{}\''.format(username))
    for x in mycursor:
        input_data=x
    try:
        input_data = convert_data(input_data)
    except:
        return {'message':'Zla nazwa uzytkownika'}
    data = input_data['friends']

    itemCount = 0
    for x in range(len(data)):
        if(data[x]==friend):
            itemCount+=1

    for x in range(itemCount):
        data.remove(friend)

    input_data['friends']=data

    output = str(input_data)
    mycursor.execute('UPDATE `Konta` SET `friends` = (\'{}\') WHERE id=\'{}\''.format(output.replace('\'','"'),username))
    mydb.commit()
    return {'message':'Usunieto','friend:':id_to_username(friend)}

def get_password(username):
    mydb,mycursor = connect_to_db()

    mycursor.execute('SELECT password from `Konta` WHERE username = \'{}\''.format(username))
    for x in mycursor:
        password=x
    return password['password']

def invite_friend(username,friend):
    mydb,mycursor = connect_to_db()
    mycursor.execute('SELECT invitations FROM Konta where username = \'{}\''.format(friend))
    for x in mycursor:
        data=x
    
    data = convert_data(data, users='invitations')

    if(username_to_id(username) in data["invitations"]):
        print('Already exists')
    else:
        data["invitations"].append(username_to_id(username))
        data = str(data)
        mycursor.execute('UPDATE `Konta` SET `invitations` = (\'{}\') WHERE username=\'{}\''.format(data.replace('\'','"'),friend))
        mydb.commit()
