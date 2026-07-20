import axios from "axios";

const API = "http://127.0.0.1:5000";

export const askTutor = async (question) => {

    return await axios.post(

        `${API}/api/chat`,

        {
            question: question
        }

    );

};