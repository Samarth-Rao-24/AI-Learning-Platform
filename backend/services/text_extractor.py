import os
from PyPDF2 import PdfReader
from docx import Document


def extract_pdf(path):

    text = ""

    reader = PdfReader(path)

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:

            text += page_text + "\n"

    return text


def extract_docx(path):

    document = Document(path)

    text = ""

    for paragraph in document.paragraphs:

        text += paragraph.text + "\n"

    return text


def extract_txt(path):

    with open(path, "r", encoding="utf-8") as file:

        return file.read()


def extract_text(path):

    extension = os.path.splitext(path)[1].lower()

    if extension == ".pdf":

        return extract_pdf(path)

    elif extension == ".docx":

        return extract_docx(path)

    elif extension == ".txt":

        return extract_txt(path)

    else:

        return None