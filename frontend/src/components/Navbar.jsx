import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    return (

        <nav
            style={{
                background: "#1f2937",
                color: "white",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <h2>AI Learning Platform</h2>

            <div>

                <Link
                    to="/"
                    style={{
                        color: "white",
                        marginRight: "20px",
                        textDecoration: "none"
                    }}
                >
                    Home
                </Link>

                {!user ? (

                    <>

                        <Link
                            to="/login"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            style={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Signup
                        </Link>

                    </>

                ) : (

                    <>

                        <Link
                            to="/dashboard"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/upload"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            Upload
                        </Link>

                        <button
                            onClick={handleLogout}
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            Logout
                        </button>

                    </>

                )}

            </div>

        </nav>

    );

}

export default Navbar;