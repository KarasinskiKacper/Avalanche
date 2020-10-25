from flask import Flask
from flask_restful import Resource,Api,reqparse
import Sites

app = Flask(__name__)
api = Api(app)

port='5000'

@app.route('/')
def index():
    return {'message':'OK'}

api.add_resource(Sites.accounts.Account,'/account')
api.add_resource(Sites.accounts.UpdateAccount,'/updateAccount')
api.add_resource(Sites.accounts.Login,'/login')

#===Actually not deployed in app===

api.add_resource(Sites.friends.Friend,'/friend')
api.add_resource(Sites.friends.Invititation,'/invite')
api.add_resource(Sites.groups.Group,'/group')
api.add_resource(Sites.groups.GroupMembers,'/member')

if __name__ == '__main__':
    app.run(port=port)

# author: Radosław Rajda