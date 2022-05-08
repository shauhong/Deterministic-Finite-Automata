from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os


def setup():
    load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))


def create_app():
    app = Flask(__name__)
    CORS(app)

    setup()
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

    from .utils import load_yaml
    from .DFA import DFA

    config = load_yaml(os.path.join(
        os.path.dirname(__file__), "assets", "DFA.yaml"))
    app.dfa = DFA(**config)

    from . import inference
    app.register_blueprint(inference.bp)

    return app
