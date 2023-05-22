import pytest
from server import app, BankingApp

banking_app = BankingApp()

banking_app.add_customer(name='basit', balance=1000, account_type='current')

'''testing if class banking app has been imported properly'''
def test_class_import():
    
    print("banking app inbstance created")
    assert isinstance(banking_app,BankingApp)
    
'''testing if user data == 'basit' exists in the instance'''
# def test_instance_data():
#     found = False

#     customer = banking_app.ge
#         if data.name == 'basit':
#             found = True
#             break

#     assert Found

# @pytest.mark.sanic
'''testing if get_account returns correct response'''
def test_get_customer_account_type():
    request, response = app.test_client.get('/api/account-type?name=basit')
    assert response.status == 200
    assert response.json == {"accountType": "current"}

'''testing if endpoint '/' returns "hello, world."'''
def test_hello_world():
    request,response = app.test_client.get('/')
    assert response.status == 200
    assert response.text == "Hello, world."
    
'''testing if endpoint /api/balance returns the balance of the customer'''
def test_balance():
    request,response = app.test_client.get('/api/balance?name=basit')
    name = request.args.get('name')
    balance = banking_app.db[name.lower()].balance
    assert response.status == 200
    assert response.json == {"balance": balance}

'''testing if money is being successfully withdrawn'''
def test_draw_money():
    data = {"amount":500,"name":"basit"}
    request, response = app.test_client.put('/api/draw-money',json=data)
    print("Expected response:", {"withdrawal successful": True, "balance": 500})
    print("Actual response:", response.json)
    assert response.status == 200
    assert response.json == {"withdrawal successful": True, "balance": 500}


'''testing if bills are payed sucessfully'''
def test_pay_bill():
    data = {"amount":200,"name":"basit","billType":"internet"}
    request, response = app.test_client.put('/api/pay-bill', json=data)
    assert response.status == 200
    assert response.json == {"response":"internet bill payed successfully! New balance is: 300"}


'''testing if bills are being transgerred between accounts:'''
def test_transfer_money():
    data = {"amount":300, "sender": "basit", "reciever": "saad"}
    request, response = app.test_client.put('/api/transfer-money',json=data)
    print(response.json)
    assert response.status == 200
    assert response.json == {'response': 'Transfer to saad successful, Remaining Balance is: 0', 'sender balance': 0, 'reciever balance': 300}

'''testing if accounts are being compared succesfully'''
def test_compare_accounts():
    data = {"acc1":"basit", "acc2": "saad"}
    request, response = app.test_client.get('/api/compare-accounts',params=data)
    print(response.json)
    assert response.status == 200
    assert response.json == "saad has more money than basit"