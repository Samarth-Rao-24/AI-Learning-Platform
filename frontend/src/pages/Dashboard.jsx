import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile } from "../services/firestoreService";
import {
    getQuizAttempts,
    calculateStatistics
} from "../services/analyticsService";
import { getUploadCount } from "../services/fileService";
import StatCard from "../components/StatCard";
import "./../styles/dashboard.css";

function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [uploadCount, setUploadCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [averageScore, setAverageScore] = useState(0);
    const [averageAccuracy, setAverageAccuracy] = useState(0);
    const [recentQuizzes, setRecentQuizzes] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const data = await getUserProfile(user.uid);
                setProfile(data);

                const uploads = await getUploadCount(user.uid);
                setUploadCount(uploads);

                const quizzes = await getQuizAttempts(user.uid);
                setRecentQuizzes(quizzes);

                const stats = calculateStatistics(quizzes);

                setQuizCount(stats.quizCount);
                setAverageScore(stats.averageScore);
                setAverageAccuracy(stats.averageAccuracy);
            }
        };

        fetchProfile();
    }, [user]);

    return (
        <div className="dashboard-container">
            <div className="profile-card">
                <h2>Student Profile</h2>

                <p>
                    <strong>Email:</strong> {profile?.email}
                </p>

                <p>
                    <strong>User ID:</strong> {profile?.uid}
                </p>
            </div>

            <div className="dashboard-cards">
                <StatCard
                    title="Uploads"
                    value={uploadCount}
                />

                <StatCard
                    title="Quizzes"
                    value={quizCount}
                />

                <StatCard
                    title="Avg Score"
                    value={averageScore}
                />

                <StatCard
                    title="Accuracy"
                    value={`${averageAccuracy}%`}
                />
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>

                <button
                    onClick={() => {
                        navigate("/upload");
                    }}
                >
                    Upload Material
                </button>

                <button
                    onClick={() => {
                        navigate("/quiz");
                    }}
                >
                    Start Quiz
                </button>

                <button
                    onClick={() => {
                        navigate("/tutor");
                    }}
                >
                    AI Tutor
                </button>
            </div>

            <div className="recent-activity">
                <h2>Recent Quiz History</h2>

                <ul>
                    {recentQuizzes.map((quiz) => (
                        <li key={quiz.id}>
                            <strong>{quiz.topic}</strong>

                            <br />

                            Score : {quiz.score}

                            <br />

                            Accuracy : {quiz.accuracy}%
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;