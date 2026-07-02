import { useState } from "react";

import { registerUser } from "../services/authService";

function Signup() {

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const handleSubmit = async (e) => {

e.preventDefault();

try {

await registerUser(email, password);

alert("Registration Successful");

}

catch(error){

alert(error.message);

}

};

return (

<div style={{padding:"30px"}}>

<h2>Signup</h2>

<form onSubmit={handleSubmit}>

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

Signup

</button>

</form>

</div>

);

}

export default Signup;