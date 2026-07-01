import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                background: "#222",
                color: "white",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <h2>AI Learning</h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px"
                }}
            >
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/upload">Upload</Link>
            </div>
        </nav>
    );
}

export default Navbar;