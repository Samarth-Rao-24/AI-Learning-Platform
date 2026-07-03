import axios from "axios";

export const uploadFile = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return await axios.post(
        "http://127.0.0.1:5000/api/upload",
        formData
    );

};