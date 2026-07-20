from flask import Blueprint, jsonify, request, current_app
from werkzeug.utils import secure_filename
import os

from services.text_extractor import extract_text
from services.document_processor import process_document
from services.gemini_service import generate_learning_material
from services.tutor_service import ask_question

api_bp = Blueprint("api", __name__)

uploaded_document = ""


@api_bp.route("/")
def home():
    return jsonify({
        "message": "Backend Running Successfully"
    })


@api_bp.route("/api/test")
def test():
    return jsonify({
        "status": "success",
        "message": "React connected successfully."
    })


@api_bp.route("/api/upload", methods=["POST"])
def upload():

    global uploaded_document

    if "file" not in request.files:
        return jsonify({
            "message": "No file selected."
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "message": "No file selected."
        }), 400

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        filename
    )

    file.save(filepath)

    text = extract_text(filepath)

    if text is None:
        return jsonify({
            "message": "Unsupported file type."
        }), 400

    uploaded_document = text

    sections = process_document(text)

    ai = generate_learning_material(text)

    return jsonify({

        "message": "Upload Successful",

        "filename": filename,

        "sections": sections,

        "ai": ai

    })


@api_bp.route("/api/chat", methods=["POST"])
def chat():

    global uploaded_document

    data = request.get_json()

    question = data.get("question", "").strip()

    if uploaded_document == "":

        return jsonify({

            "answer": "Please upload a study document first."

        })

    answer = ask_question(

        uploaded_document,

        question

    )

    return jsonify({

        "answer": answer

    })