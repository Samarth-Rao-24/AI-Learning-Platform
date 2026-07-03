import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import { getUserProfile } from "../services/firestoreService";

import "./../styles/dashboard.css";

function Dashboard(){

const {user}=useContext(AuthContext);

const [profile,setProfile]=useState(null);

useEffect(()=>{

const loadProfile=async()=>{

if(user){

const data=await getUserProfile(user.uid);

setProfile(data);

}

};

loadProfile();

},[user]);

return(

<div className="dashboard-container">

<h1>

Welcome

</h1>

<p>

{profile?.email}

</p>

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

</div>

);

}

export default Dashboard;