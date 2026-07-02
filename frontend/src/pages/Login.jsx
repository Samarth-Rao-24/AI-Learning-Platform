import { useState } from "react";

import { loginUser, googleLogin } from "../services/authService";

import { useNavigate } from "react-router-dom";

function Login() {

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const navigate=useNavigate();

const handleLogin=async(e)=>{

e.preventDefault();

try{

await loginUser(email,password);

navigate("/dashboard");

}

catch(error){

alert(error.message);

}

};

const handleGoogleLogin=async()=>{

try{

await googleLogin();

navigate("/dashboard");

}

catch(error){

alert(error.message);

}

};

return(

<div style={{padding:"30px"}}>

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<br/><br/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<br/><br/>

<button>

Login

</button>

</form>

<br/>

<button onClick={handleGoogleLogin}>

Sign in with Google

</button>

</div>

);

}

export default Login;