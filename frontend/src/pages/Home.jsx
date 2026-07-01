import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

    const [backendMessage, setBackendMessage] = useState("");

    useEffect(() => {

        axios
            .get("http://127.0.0.1:5000/api/test")
            .then((response) => {

                setBackendMessage(response.data.message);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (

        <div style={{ padding: "30px" }}>

            <h1>AI Learning Platform</h1>

            <p>Learn Smarter with AI.</p>

            <hr />

            <h3>Backend Response</h3>

            <p>{backendMessage}</p>

        </div>

    );
}

export default Home;