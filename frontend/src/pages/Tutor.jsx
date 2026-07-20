import { useState, useRef, useEffect } from "react";
import { askTutor } from "../services/tutorService";
import { useNavigate } from "react-router-dom";

function Tutor() {

    const navigate = useNavigate();

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    const sendMessage = async () => {

        if (question.trim() === "") return;

        const userMessage = {

            sender: "user",

            text: question

        };

        setMessages((prev) => [

            ...prev,

            userMessage

        ]);

        const currentQuestion = question;

        setQuestion("");

        setLoading(true);

        try {

            const response = await askTutor(

                currentQuestion

            );

            const aiMessage = {

                sender: "ai",

                text: response.data.answer

            };

            setMessages((prev) => [

                ...prev,

                aiMessage

            ]);

        }

        catch {

            setMessages((prev) => [

                ...prev,

                {

                    sender: "ai",

                    text: "Unable to connect to server."

                }

            ]);

        }

        setLoading(false);

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            sendMessage();

        }

    };

    return (

        <div
            style={{
                maxWidth: "900px",
                margin: "30px auto",
                padding: "20px"
            }}
        >

            <h1>AI Tutor</h1>

            <button

                onClick={() => navigate("/upload")}

                style={{

                    marginBottom: "20px"

                }}

            >

                Back to Upload

            </button>

            <div

                style={{

                    border: "1px solid #ccc",

                    borderRadius: "10px",

                    height: "500px",

                    overflowY: "auto",

                    padding: "20px",

                    marginBottom: "20px"

                }}

            >

                {

                    messages.length === 0 && (

                        <p>

                            Ask any question related to the uploaded document.

                        </p>

                    )

                }

                {

                    messages.map((message, index) => (

                        <div

                            key={index}

                            style={{

                                display: "flex",

                                justifyContent:

                                    message.sender === "user"

                                        ? "flex-end"

                                        : "flex-start",

                                marginBottom: "15px"

                            }}

                        >

                            <div

                                style={{

                                    backgroundColor:

                                        message.sender === "user"

                                            ? "#dbeafe"

                                            : "#f3f4f6",

                                    padding: "12px",

                                    borderRadius: "10px",

                                    maxWidth: "70%",

                                    whiteSpace: "pre-wrap"

                                }}

                            >

                                {

                                    message.text

                                }

                            </div>

                        </div>

                    ))

                }

                {

                    loading && (

                        <div>

                            AI Tutor is typing...

                        </div>

                    )

                }

                <div ref={bottomRef}></div>

            </div>

            <input

                type="text"

                placeholder="Ask a question..."

                value={question}

                onChange={(e) =>

                    setQuestion(

                        e.target.value

                    )

                }

                onKeyDown={handleKeyDown}

                style={{

                    width: "80%",

                    padding: "12px"

                }}

            />

            <button

                onClick={sendMessage}

                style={{

                    marginLeft: "10px",

                    padding: "12px 20px"

                }}

            >

                Send

            </button>

        </div>

    );

}

export default Tutor;