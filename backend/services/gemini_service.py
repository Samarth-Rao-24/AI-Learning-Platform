import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_gemini(prompt):

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        return None


def generate_summary(text):

    prompt = f"""
You are an expert teacher.

Generate a concise summary of the following study material.

Study Material:

{text}
"""

    return ask_gemini(prompt)


def generate_notes(text):

    prompt = f"""
You are an expert teacher.

Generate detailed study notes.

Requirements:

• Use headings

• Explain every topic

• Use bullet points

• Keep the language simple

Study Material:

{text}
"""

    return ask_gemini(prompt)


def generate_flashcards(text):

    prompt = f"""
Generate 10 flashcards.

Return in this format only.

Question:
Answer:

Study Material:

{text}
"""

    return ask_gemini(prompt)


def generate_mcqs(text):

    prompt = f"""
Generate 10 multiple choice questions.

Format:

Question

A)

B)

C)

D)

Answer:

Study Material:

{text}
"""

    return ask_gemini(prompt)