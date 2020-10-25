import requests

class UnitTest():
    
    def __init__(self, verbose=False):

        self.verbose = verbose

        self.account_post_test()
        self.account_get_test()
        self.specified_account_get_test()
        self.account_delete_test()
        self.updateaccount_post_test()
        self.friend_post_test()
        self.friend_get_test()
        self.friend_delete_test()
        self.account_delete_test(username='testingUser')
        self.account_delete_test(username='testingFriend')
        self.login_post_test()

    def account_get_test(self):
        r = requests.get('http://127.0.0.1:5000/account',
        params={
            'token':'10c15a41094124737263dd77ac96dcb5'
        })
        if(self.verbose):
            print('Started account_get_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')

    def specified_account_get_test(self, username='Test'):
        r = requests.get('http://127.0.0.1:5000/account',
        params={
            'token':'10c15a41094124737263dd77ac96dcb5',
            'username': username
        })
        if(self.verbose):
            print('Started specified_account_get_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')

    def account_post_test(self,username='Test',password='Test',email='test@test.com'):
        r = requests.post('http://127.0.0.1:5000/account',
        params={
            'token':'10c15a41094124737263dd77ac96dcb5',
            'username': username,
            'password': password,
            'email': email
        })
        if(self.verbose):
            print('Started account_post_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')

    def account_delete_test(self, username='Test',create=True):
        if(create):
            self.account_post_test(username=username)
        r = requests.delete('http://127.0.0.1:5000/account',
        params={
            'token':'10c15a41094124737263dd77ac96dcb5',
            'username': username
        })
        if(self.verbose):
            print('Started account_delete_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')

    def updateaccount_post_test(self, username='Test',types=['username','password','email']):
        self.account_post_test(username='Test')
        if(self.verbose):
            print('Started updateaccount_post_test')
        for type in types:
            r = requests.post('http://127.0.0.1:5000/updateAccount',
            params={
                'token':'10c15a41094124737263dd77ac96dcb5',
                'username': username,
                'type': type,
                'new': 'Tested',
                'password':'Test'
            })
            if(self.verbose):
                print('======\n')
                print('Connection status:',r.status_code)
                print(r.text)
                print('======\n')
        self.account_delete_test(username='Tested',create=False)

    def friend_post_test(self, create=True):
        if(create):
            self.account_post_test(username='testingUser')
            self.account_post_test(username='testingFriend')
        r = requests.post('http://127.0.0.1:5000/friend',
            params={
                'token':'10c15a41094124737263dd77ac96dcb5',
                'username': 'testingUser',
                'friend': 'testingFriend'
        })
        if(self.verbose):
            print('Started friend_post_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')

    def friend_get_test(self):
        
        self.friend_post_test()
        r = requests.get('http://127.0.0.1:5000/friend',
            params={
                'token':'10c15a41094124737263dd77ac96dcb5',
                'username': 'testingUser'
        })
        if(self.verbose):
            print('Started friend_get_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')

    def friend_delete_test(self,username='testingUser',friend='testingFriend'):
        self.friend_post_test()
        r = requests.delete('http://127.0.0.1:5000/friend',
            params={
                'token':'10c15a41094124737263dd77ac96dcb5',
                'username': username,
                'friend': friend
        })
        if(self.verbose):
            print('Started friend_delete_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')

    def login_post_test(self):
        self.account_post_test(username='user1',password='userpasswordtest')
        r = requests.post('http://127.0.0.1:5000/login',
            params={
                'token':'10c15a41094124737263dd77ac96dcb5',
                'username': 'user1',
                'password': 'userpasswordtest'
        })
        if(self.verbose):
            print('Started login_post_test')
            print('======\n')
            print('Connection status:',r.status_code)
            print(r.text)
            print('======\n')
        self.account_delete_test(username='user1',create=False)




test = UnitTest()

