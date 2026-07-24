from flask import Blueprint, jsonify, request, current_app
from werkzeug.utils import secure_filename
import os

from services.text_extractor import extract_text
from services.document_processor import process_document
from services.gemini_service import generate_learning_material
from services.tutor_service import ask_question

api_bp = Blueprint("api", __name__)

# -----------------------------
# Global Memory
# -----------------------------

uploaded_document = ""
generated_ai = {}

# -----------------------------
# Home
# -----------------------------

@api_bp.route("/")
def home():

    return jsonify({

        "message": "Backend Running Successfully"

    })


# -----------------------------
# Test
# -----------------------------

@api_bp.route("/api/test")
def test():

    return jsonify({

        "status": "success",

        "message": "Backend Connected Successfully"

    })


# -----------------------------
# Upload
# -----------------------------

@api_bp.route("/api/upload", methods=["POST"])
def upload():

    global uploaded_document
    global generated_ai

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

            "message": "Unsupported File"

        }), 400

    uploaded_document = text

    sections = process_document(text)

    generated_ai = generate_learning_material(text)

    return jsonify({

        "message": "Upload Successful",

        "filename": filename,

        "sections": sections,

        "ai": generated_ai

    })


# -----------------------------
# AI Tutor
# -----------------------------

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


# -----------------------------
# Get Quiz
# -----------------------------

@api_bp.route("/api/quiz", methods=["GET"])
def get_quiz():

    global generated_ai

    if generated_ai == {}:

        return jsonify({

            "message": "No quiz available."

        }), 404

    return jsonify({

        "mcqs": generated_ai.get("mcqs", [])

    })

# -----------------------------
# Submit Quiz
# -----------------------------

@api_bp.route("/api/submitQuiz", methods=["POST"])
def submit_quiz():

    global generated_ai

    if generated_ai == {}:

        return jsonify({

            "message": "No quiz available."

        }), 404

    data = request.get_json()

    user_answers = data.get("answers", [])

    mcqs = generated_ai.get("mcqs", [])

    score = 0

    results = []

    for index, mcq in enumerate(mcqs):

        correct_answer = mcq["answer"]

        user_answer = ""

        if index < len(user_answers):
            user_answer = user_answers[index]

        is_correct = user_answer == correct_answer

        if is_correct:
            score += 1

        results.append({

            "question": mcq["question"],

            "correct_answer": correct_answer,

            "user_answer": user_answer,

            "is_correct": is_correct

        })

    return jsonify({

        "total_questions": len(mcqs),

        "score": score,

        "results": results

    })
