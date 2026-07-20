import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_question(document_text, question):

    prompt = f"""
You are an expert teacher.

You must answer ONLY using the study material below.

If the answer is not present,
reply exactly:

"This topic is not covered in the uploaded material."

Study Material:

{document_text}

Student Question:

{question}

Answer:
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print(e)

        return "Unable to answer right now."