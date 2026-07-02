import { logoutUser } from "../services/authService";

function Dashboard(){

const handleLogout=async()=>{

await logoutUser();

};

return(

<div style={{padding:"30px"}}>

<h1>Dashboard</h1>

<p>Login Successful!</p>

<button onClick={handleLogout}>

Logout

</button>

</div>

);

}

export default Dashboard;