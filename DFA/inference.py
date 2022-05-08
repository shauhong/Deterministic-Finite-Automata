import os
from flask import Blueprint, abort, current_app, jsonify, request, url_for
from py import process
from DFA.DFA import process_text
from DFA.utils import load_text

bp = Blueprint("inference", __name__, url_prefix="/inference")


@bp.route("/text", methods=["POST", "GET"])
def inference():
    if request.method == "POST":
        content = request.json
        if not content:
            abort(404, description="Request body is empty")
        text = content['text']
        print(text)
        matches, patterns = process_text(current_app.dfa, text)
        return jsonify(matches=matches, patterns=patterns)

    if request.method == "GET":
        root = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(root, 'assets', 'sample.txt')
        text = load_text(path)

        matches, patterns = process_text(current_app.dfa, text)
        return jsonify(text=text, matches=matches, patterns=patterns)


@bp.route("/healthcheck", methods=["GET"])
def healthcheck():
    return {'running': True}
