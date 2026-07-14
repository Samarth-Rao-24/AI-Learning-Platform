import { useState, useEffect, useContext } from "react";
import { uploadFile } from "../services/uploadService";
import {
  saveFileMetadata,
  getUserFiles,
  deleteFileMetadata,
} from "../services/fileService";
import { AuthContext } from "../context/AuthContext";

function Upload() {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const [sections, setSections] = useState([]);
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [flashcards, setFlashcards] = useState("");
  const [mcqs, setMcqs] = useState("");

  const [files, setFiles] = useState([]);

  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const loadFiles = async () => {
    if (!user) return;

    const data = await getUserFiles(user.uid);
    setFiles(data);
  };

  useEffect(() => {
    loadFiles();
  }, [user]);

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

      setSections(response.data.sections);
      setSummary(response.data.summary);
      setNotes(response.data.notes);
      setFlashcards(response.data.flashcards);
      setMcqs(response.data.mcqs);

      await saveFileMetadata({
        uid: user.uid,
        fileName: file.name,
        fileType: file.type,
        uploadedAt: new Date().toLocaleString(),
      });

      loadFiles();

      setFile(null);

    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  };

  const handleDelete = async (id) => {
    await deleteFileMetadata(id);
    loadFiles();
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

      <h2>Document Structure</h2>

      {sections.length === 0 ? (
        <p>No document processed.</p>
      ) : (
        sections.map((section, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))
      )}

      <hr />

      <h2>AI Summary</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {summary}
        </pre>
      </div>

      <hr />

      <h2>Detailed Notes</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {notes}
        </pre>
      </div>

      <hr />

      <h2>Flashcards</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {flashcards}
        </pre>
      </div>

      <hr />

      <h2>MCQs</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {mcqs}
        </pre>
      </div>

      <hr />

      <h2>Uploaded Files</h2>

      {files.length === 0 ? (
        <p>No uploaded files.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Uploaded On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {files.map((uploadedFile) => (
              <tr key={uploadedFile.id}>
                <td>{uploadedFile.fileName}</td>
                <td>{uploadedFile.fileType}</td>
                <td>{uploadedFile.uploadedAt}</td>
                <td>
                  <button
                    onClick={() => handleDelete(uploadedFile.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default Upload;