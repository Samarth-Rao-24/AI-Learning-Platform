import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_learning_material(text):

    prompt = f"""
You are an expert teacher.

Read the following study material.

Return ONLY valid JSON.

The JSON must contain exactly these keys.

{{
    "summary":"",
    "notes":"",
    "flashcards":[
        {{
            "question":"",
            "answer":""
        }}
    ],
    "mcqs":[
        {{
            "question":"",
            "options":[
                "",
                "",
                "",
                ""
            ],
            "answer":""
        }}
    ],
    "important_questions":[
        ""
    ],
    "revision_notes":"",
    "chapter_summary":""
}}

Study Material:

{text}
"""

    try:

        response = model.generate_content(prompt)

        content = response.text.strip()

        if content.startswith("```json"):
            content = content.replace("```json", "")
            content = content.replace("```", "")

        elif content.startswith("```"):
            content = content.replace("```", "")

        return json.loads(content)

    except Exception as e:

        print("Gemini Error:", e)

        return {

            "summary": "Gemini quota exceeded.",

            "notes": "Gemini quota exceeded.",

            "flashcards": [],

            "mcqs": [],

            "important_questions": [],

            "revision_notes": "Gemini quota exceeded.",

            "chapter_summary": "Gemini quota exceeded."

        }