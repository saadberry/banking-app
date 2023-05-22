# sanic-testing

To Create a Virtual Environment:
1. While in your project directory, type the following command in your terminal: virtualenv venv
2. To activate your virtual environment, type the following command in your terminal: source venv/bin/activate

To install Requirements.txt in your Virtual Environment:
1. python install -r requirements.txt

To start server:
1. sanic server

To test server:
1. pytest test_server.py

To generate coverage report:
1. pytest -v --cov=backend