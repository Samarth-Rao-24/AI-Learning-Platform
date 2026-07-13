import re

def process_document(text):

    lines = text.splitlines()

    sections = []

    current_title = "Introduction"

    current_content = []

    pattern = re.compile(r'^(Unit|UNIT|Chapter|CHAPTER)\s*\d*[:.-]?\s*(.*)')

    for line in lines:

        line = line.strip()

        if not line:
            continue

        match = pattern.match(line)

        if match:

            if current_content:

                sections.append({

                    "title": current_title,

                    "content": "\n".join(current_content)

                })

            title = match.group(2).strip()

            if title == "":
                title = match.group(1)

            current_title = title

            current_content = []

        else:

            current_content.append(line)

    if current_content:

        sections.append({

            "title": current_title,

            "content": "\n".join(current_content)

        })

    return sections