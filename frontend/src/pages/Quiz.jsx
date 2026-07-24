import { useEffect, useState } from "react";
import { getQuiz, submitQuiz } from "../services/quizService";
import { useNavigate } from "react-router-dom";

function Quiz() {

    const navigate = useNavigate();

    const [mcqs, setMcqs] = useState([]);
    const [current, setCurrent] = useState(0);

    const [answers, setAnswers] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    const [result, setResult] = useState(null);

    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {

        loadQuiz();

    }, []);

    useEffect(() => {

        if (submitted) return;

        if (timeLeft <= 0) {

            handleSubmit();

            return;

        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, submitted]);

    const loadQuiz = async () => {

        try {

            const response = await getQuiz();

            setMcqs(response.data.mcqs);

            setAnswers(
                new Array(response.data.mcqs.length).fill("")
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleOption = (option) => {

        const copy = [...answers];

        copy[current] = option;

        setAnswers(copy);

    };

    const handleSubmit = async () => {

        try {

            const response = await submitQuiz(answers);

            setResult(response.data);

            setSubmitted(true);

        }

        catch (err) {

            console.log(err);

        }

    };

    const retryQuiz = () => {

        setAnswers(
            new Array(mcqs.length).fill("")
        );

        setCurrent(0);

        setSubmitted(false);

        setResult(null);

        setTimeLeft(600);

    };

    if (mcqs.length === 0) {

        return <h2>No Quiz Available.</h2>;

    }

    if (submitted) {

        return (

            <div style={{ padding: "30px" }}>

                <h1>Quiz Result</h1>

                <h2>

                    Score

                    {" "}

                    {result.score}

                    /

                    {result.total_questions}

                </h2>

                <hr />

                {

                    result.results.map((item, index) => (

                        <div

                            key={index}

                            style={{

                                border: "1px solid gray",

                                marginBottom: "20px",

                                padding: "15px"

                            }}

                        >

                            <h3>

                                Q{index + 1}. {item.question}

                            </h3>

                            <p>

                                Your Answer :

                                {" "}

                                {item.user_answer || "Not Answered"}

                            </p>

                            <p>

                                Correct Answer :

                                {" "}

                                {item.correct_answer}

                            </p>

                            <p>

                                {

                                    item.is_correct

                                        ? "Correct"

                                        : "Wrong"

                                }

                            </p>

                        </div>

                    ))

                }

                <button onClick={retryQuiz}>

                    Retry Quiz

                </button>

            </div>

        );

    }

    const question = mcqs[current];

    return (

        <div style={{ padding: "30px" }}>

            <h1>AI Quiz</h1>

            <div

                style={{

                    marginBottom: "20px"

                }}

            >

                <button

                    onClick={() => navigate("/upload")}

                >

                    Upload Page

                </button>

                <button

                    onClick={() => navigate("/tutor")}

                    style={{

                        marginLeft: "10px"

                    }}

                >

                    AI Tutor

                </button>

            </div>

            <h3>

                Time Left :

                {" "}

                {Math.floor(timeLeft / 60)}

                :

                {(timeLeft % 60)
                    .toString()
                    .padStart(2, "0")}

            </h3>

            <hr />

            <h2>

                Question

                {" "}

                {current + 1}

                /

                {mcqs.length}

            </h2>

            <h3>

                {question.question}

            </h3>

            {

                question.options.map((option, index) => (

                    <div key={index}>

                        <label>

                            <input

                                type="radio"

                                checked={answers[current] === option}

                                onChange={() =>

                                    handleOption(option)

                                }

                            />

                            {" "}

                            {option}

                        </label>

                    </div>

                ))

            }

            <br />

            <button

                disabled={current === 0}

                onClick={() =>

                    setCurrent(current - 1)

                }

            >

                Previous

            </button>

            <button

                style={{

                    marginLeft: "10px"

                }}

                disabled={current === mcqs.length - 1}

                onClick={() =>

                    setCurrent(current + 1)

                }

            >

                Next

            </button>

            <button

                style={{

                    marginLeft: "20px"

                }}

                onClick={handleSubmit}

            >

                Submit Quiz

            </button>

        </div>

    );

}

export default Quiz;