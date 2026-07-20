import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Tutor from "./pages/Tutor";
import NotFound from "./pages/NotFound";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route

                    path="/"

                    element={<Home />}

                />

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/signup"

                    element={<Signup />}

                />

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/upload"

                    element={

                        <ProtectedRoute>

                            <Upload />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/tutor"

                    element={

                        <ProtectedRoute>

                            <Tutor />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="*"

                    element={<NotFound />}

                />

            </Routes>

            <Footer />

        </BrowserRouter>

    );

}

export default App;