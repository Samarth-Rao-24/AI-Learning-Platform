from flask import Blueprint, jsonify, request, current_app
from werkzeug.utils import secure_filename

import os

from services.text_extractor import extract_text
from services.document_processor import process_document
from services.gemini_service import generate_learning_material

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


@api_bp.route("/api/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:

        return jsonify({

            "message": "No file selected"

        }), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify({

            "message": "No file selected"

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

            "message": "Unsupported file"

        }), 400

    sections = process_document(text)

    ai_content = generate_learning_material(text)

    return jsonify({

        "message": "File uploaded successfully",

        "filename": filename,

        "sections": sections,

        "ai": ai_content

    })