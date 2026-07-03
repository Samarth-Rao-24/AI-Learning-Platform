import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile } from "../services/firestoreService";
import "./../styles/dashboard.css";

function Dashboard() {

    const { user } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            if (user) {

                const data = await getUserProfile(user.uid);

                setProfile(data);

            }

        };

        fetchProfile();

    }, [user]);

    return (

        <div className="dashboard-container">

            <div className="profile-card">

                <h2>Student Profile</h2>

                <p><strong>Email:</strong> {profile?.email}</p>

                <p><strong>User ID:</strong> {profile?.uid}</p>

            </div>

            <div className="dashboard-cards">

                <div className="card">

                    <h3>Subjects</h3>

                    <h2>5</h2>

                </div>

                <div className="card">

                    <h3>Study Hours</h3>

                    <h2>24</h2>

                </div>

                <div className="card">

                    <h3>Completed Topics</h3>

                    <h2>18</h2>

                </div>

                <div className="card">

                    <h3>Quiz Accuracy</h3>

                    <h2>89%</h2>

                </div>

            </div>

            <div className="quick-actions">

                <h2>Quick Actions</h2>

                <button>Upload Material</button>

                <button>Start Quiz</button>

                <button>Generate Notes</button>

            </div>

            <div className="recent-activity">

                <h2>Recent Activity</h2>

                <ul>

                    <li>Uploaded Operating Systems Notes</li>

                    <li>Completed Java Quiz</li>

                    <li>Generated AI Flashcards</li>

                </ul>

            </div>

        </div>

    );

}

export default Dashboard;