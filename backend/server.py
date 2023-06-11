'''server code of banking app'''
# unit test, 90% coverage of code mandatory
# pylint
# compare two users using magic method ( custom implementation ),
import re

from sanic import Sanic, response
from sanic.response import text, json
from sanic_cors import CORS



app = Sanic("MyHelloWorldApp")
CORS(app)

# db = [
#     {
#             "basit": [{
#                 "balance":1000
#             }]
#     }
# ]




class Customer:
    '''Class that implements methods of customer'''
    def __init__(self, name, account_type, balance=0):
        self.name = name
        self.balance = balance
        self.account_type = account_type

    def __repr__(self):

        return f"Customer(name='{self.name}', account_type='{self.account_type}', balance={self.balance})"


class BankingApp:
    ''' class that implements the core methods of the app'''
    def __init__(self):
        self.db = {}

    def add_customer(self, name, account_type, balance=0):
        customer = Customer(name, account_type, balance)
        self.db[name.lower()] = customer

    def get_customer_balance(self, name):
        # name = name.lower()
        if name in self.db:
            return self.db[name].balance
        return None

    def get_customer_account_type(self, name):
        if name in self.db:
            return self.db[name].account_type
        return None

    def withdraw_money(self, name, amount):
        if name in self.db:
            customer = self.db[name]
            if int(amount) <= customer.balance:
                customer.balance -= int(amount)
                return True
        return True

    def pay_bill(self, name, amount, billType):
        if name in self.db:
            customer = self.db[name]
            if int(amount) < customer.balance:
                # customer = self.db[name]
                customer.balance -= int(amount)
                return f'{billType} bill payed successfully! New balance is: {customer.balance}'
        return 'unable to process transaction'

    def transfer_money(self, sender_name, recipient_name, amount):
        sender_name = sender_name.lower()
        recipient_name = recipient_name.lower()
        if sender_name in self.db and recipient_name in self.db:
            sender = self.db[sender_name]
            recipient = self.db[recipient_name]
            amount = int(amount)
            if amount <= sender.balance:
                # sender.balance -= amount
                # recipient.balance += amount
                self.db[sender_name].balance -= amount
                self.db[recipient_name].balance += amount
                return f"Transfer to {recipient_name} successful, Remaining Balance is: {sender.balance}"
        return False

    '''magic method that allows us to customize the behavior of 'in' operator '''
    #equals,lesser than, greater than magic methods to implement 
    #3 diff methods
    #testing 123
    #abc
    
    def __contains__(self,name):
        return name.lower() in self.db

    '''defining lesser than,greater than, and equal to magic methods'''
    def __lt__(self,other):
        return self.balance < other.balance
    
    def __gt__(self,other):
        return self.balance > other.balance
    
    def __eq__(self,other):
        return self.balance == other.balance
    
    
    def compare_accounts(self, name1, name2):
        name1 = name1.lower()
        name2 = name2.lower()
        account1 = self.db[name1].balance
        account2 = self.db[name2].balance
        print(account1,account2)

        try:

            # if name1 in self and name2 in self:
            #     balance1 = self.db[name1].balance
            #     balance2 = self.db[name2].balance

            if account1 > account2:
                return f"{name1} has more money than {name2}"
            elif account1 < account2:
                return f"{name2} has more money than {name1}"
            elif account1 == account2:
                return "Both accounts have the same balance"
            else:
                return "Account not found!"
        except KeyError:
            return "Account not found!"


banking_app = BankingApp()
banking_app.add_customer("basit", account_type='current', balance=1000)
banking_app.add_customer("saad", account_type='current', balance=0)
print(banking_app.db)

''' defining endpoints '''


@app.get("/")
async def hello_world(request):
    return text("Hello, world.")


@app.route('/test')
async def test(request):
    ''' method defined for testing purposes '''
    return text("test")


@app.get('/api/balance')
async def balance(request):
    ''' method that returns the balance of customer '''
    response = text('Hello, world.')

    # balance = 1000
    name = request.args.get('name')
    # name = name.replace('"','')
    # name = name.replace('/','')
    name = re.sub(r'\\*"(.*?)"\\*', r'\1', name)
    name = name.lower()
    # name = ' '.join(name)
    # name = name.split('"').join('');
    balance = banking_app.get_customer_balance(name)
    # print(balance)
    response = json({"balance": int(balance)})

    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# @app.put('/api/draw-money')
# async def draw_money(request):
#     # response =  text('Hello, world.')
#     amount = request.json.get('amount')
#     balance = 1000
#     new_balance = balance - amount
#     response = json({"balance":new_balance})

#     response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
#     response.headers["Access-Control-Allow-Methods"] = "PUT"  # Specify the allowed methods if
#     response.headers["Referrer-Policy"] = "no-referrer-when-downgrade"  # Set the Referrer Policy
#     response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"

#     return response

# route to draw money


@app.route('/api/draw-money', methods=['OPTIONS', 'PUT'])
async def draw_money(request):
    ''' method that allows customers to withdraw money '''
    if request.method == 'OPTIONS':
        # Handle the preflight request
        headers = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "PUT",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Referrer-Policy": "no-referrer-when-downgrade"
        }
        return response.text('', headers=headers)

    # Handle the actual PUT request
    amount = request.json.get('amount')
    name = request.json.get('name')
    # name = name.replace('"','')
    # name = name.replace('/','')
    name = re.sub(r'\\*"(.*?)"\\*', r'\1', name)
    name = name.lower()
    # name = ' '.join(name)
    # name = name.split('"').join('');
    # balance = banking_app.get_customer_balance(name)

    withdraw = banking_app.withdraw_money(name, amount)
    # print('balance is:',balance)
    # return amount
    # new_balance = balance - int(amount)
    data = {"withdrawal successful": withdraw,
            "balance": banking_app.db[name.lower()].balance}
    # print('new balance is:',new_balance)
    # banking_app.db[name.lower()].balance = new_balance
    return response.json(data, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})

# route to deposit billl


@app.route('/api/pay-bill', methods=['OPTIONS', 'PUT'])
async def pay_bill(request):
    ''' method that allows customers to pay their bills '''
    if request.method == 'OPTIONS':
        # Handle the preflight request
        headers = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "PUT",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Referrer-Policy": "no-referrer-when-downgrade"
        }
        return response.text('', headers=headers)

    # Handle the actual PUT request
    amount = request.json.get('amount')
    name = request.json.get('name')
    bill = request.json.get('billType')
    # name = name.replace('"','')
    # name = name.replace('/','')
    name = re.sub(r'\\*"(.*?)"\\*', r'\1', name)
    name = name.lower()
    # name = ' '.join(name)
    # name = name.split('"').join('');
    # balance = banking_app.db[name.lower()].balance
    pay_bill = banking_app.pay_bill(name, amount, bill)
    data = {"response": pay_bill}
    return response.json(data, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})
    # print('balance is:',balance)
    # return amount
    # if (int(amount) < balance):

    #     new_balance = balance - int(amount)
    #     data = {"balance": new_balance}
    #     print(bill,' bill payed successfully! New balance is:',new_balance)
    #     banking_app.db[name.lower()].balance = new_balance
    #



@app.route('/api/transfer-money', methods=['OPTIONS', 'PUT'])
async def transfer_money(request):
    ''' method that transfers money from one account to another '''
    if request.method == 'OPTIONS':
        # Handle the preflight request
        headers = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "PUT",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Referrer-Policy": "no-referrer-when-downgrade"
        }
        return response.text('', headers=headers)

    # Handle the actual PUT request
    amount = request.json.get('amount')
    sender = request.json.get('sender')
    reciever = request.json.get('reciever')
    print('sender name is: ', sender)
    print('amount is: ', amount)
    print('reciever is: ', reciever)

    sender_balance = banking_app.db[sender.lower()].balance
    reciever_balance = banking_app.db[reciever.lower()].balance
    print('sender balance is:', sender_balance)
    print('reciever balance is:', reciever_balance)

    transaction = banking_app.transfer_money(sender, reciever, amount)
    # return amount
    # if (int(amount) < sender_balance):
    #     print("hehe")

    # deducting balance from sender
    # new_balance = sender_balance - int(amount)
    # banking_app.db[sender.lower()].balance = new_balance

    # #adding balance to reciever's wallet
    # reciever_balance += int(amount)
    # banking_app.db[reciever.lower()].balance = reciever_balance

    # data = {"sender balance": new_balance,"reciever balance":reciever_balance}
    data = {"response": transaction, "sender balance": banking_app.db[sender.lower(
    )].balance, "reciever balance": banking_app.db[reciever.lower()].balance}

    # print('Amount transferred successfully to Reciever:',reciever, ',New balance is:',new_balance)
    # print('Amount recieved by:',sender, ',New balance is:',reciever_balance)
    # banking_app.db[sender.lower()].balance = new_balance
    return response.json(data, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})
    # else:
    #     return response.json({"error": {"message": "INSUFFICIENT FUNDS TO CARRY OUT TRANSACTION"}}, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})


# get account type
@app.get("/api/account-type")
async def account_type(request):
    ''' method that returns the type of account of the user '''
    # name = request.json.get('name')
    # name = request.json.get("name")
    name = request.args.get('name')

    # print(name)
    account = banking_app.get_customer_account_type(name)
    print(account)
    data = {"accountType": account}
    return response.json(data, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})

# Compare accounts


@app.get('/api/compare-accounts')
async def compare_accounts(request):
    ''' method that compares balances of two accounts '''
    acc1 = request.args.get('acc1')
    acc2 = request.args.get('acc2')
    print(acc1, acc2)

    acc1_balance = banking_app.db[acc1.lower()].balance
    acc2_balance = banking_app.db[acc2.lower()].balance
    print(acc1_balance, acc2_balance)
    data = banking_app.compare_accounts(acc1, acc2)

    # data = {"txt":'text'}
    return response.json(data, headers={"Access-Control-Allow-Origin": "http://localhost:3000"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
