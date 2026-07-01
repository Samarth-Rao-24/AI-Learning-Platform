from flask import Blueprint, jsonify

api_bp = Blueprint("api", __name__)


@api_bp.route("/")
def home():
    return jsonify({
        "message": "Backend is running successfully!"
    })


@api_bp.route("/api/test")
def test():
    return jsonify({
        "status": "success",
        "message": "React is connected to Flask!",
        "version": "1.0"
    })