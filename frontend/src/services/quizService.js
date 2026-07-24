import axios from "axios";

const API = "http://127.0.0.1:5000";

export const getQuiz = async () => {
    return await axios.get(`${API}/api/quiz`);
};

export const submitQuiz = async (answers) => {
    return await axios.post(
        `${API}/api/submitQuiz`,
        {
            answers: answers
        }
    );
};