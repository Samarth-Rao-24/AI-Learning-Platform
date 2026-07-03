import "./../styles/dashboard.css";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Dashboard(){

const {user}=useContext(AuthContext);

return(

<div className="dashboard-container">

<div className="dashboard-header">

<div>

<h1>

Welcome,

{user?.email}

</h1>

<p>

Ready to continue learning?

</p>

</div>

</div>

<div className="dashboard-cards">

<div className="card">

<h3>

Subjects

</h3>

<h2>

5

</h2>

</div>

<div className="card">

<h3>

Study Hours

</h3>

<h2>

24

</h2>

</div>

<div className="card">

<h3>

Completed Topics

</h3>

<h2>

18

</h2>

</div>

<div className="card">

<h3>

Quiz Accuracy

</h3>

<h2>

89%

</h2>

</div>

</div>

<div className="quick-actions">

<h2>

Quick Actions

</h2>

<div className="action-buttons">

<button>

Upload Study Material

</button>

<button>

Start Quiz

</button>

<button>

AI Tutor

</button>

<button>

Study Notes

</button>

</div>

</div>

<div className="recent-section">

<h2>

Recent Activity

</h2>

<div className="activity-item">

Uploaded Data Structures Notes

</div>

<div className="activity-item">

Completed Sorting Quiz

</div>

<div className="activity-item">

Generated AI Flashcards

</div>

</div>

</div>

);

}

export default Dashboard;