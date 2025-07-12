from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from config import Config
from auth import auth_bp
from openstack_api import os_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(os_bp, url_prefix='/api/os')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5001)