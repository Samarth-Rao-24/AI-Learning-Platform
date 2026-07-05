import { useState } from "react";
import { uploadFile } from "../services/uploadService";

function Upload() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [extractedText, setExtractedText] = useState("");

    const allowedTypes = [
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setMessage("Only PDF, DOCX and TXT files are allowed.");
            return;
        }

        try {

            const response = await uploadFile(file);

            setMessage(response.data.message);
            setExtractedText(response.data.text);

        }
        catch (error) {
            setMessage("Upload failed.");
        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Upload Study Material</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <br /><br />

                <button type="submit">
                    Upload
                </button>

            </form>

            <br />

            <p>{message}</p>

            <hr />

            <h2>Extracted Text Preview</h2>

            <textarea
                rows="15"
                cols="100"
                readOnly
                value={extractedText}
            />

        </div>

    );

}

export default Upload;