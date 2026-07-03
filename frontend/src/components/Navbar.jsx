import { Link } from "react-router-dom";

function Navbar(){

return(

<nav
style={{
background:"#1f2937",
padding:"15px",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<h2 style={{color:"white"}}>

AI Learning Platform

</h2>

<div>

<Link
to="/dashboard"
style={{
color:"white",
marginRight:"20px",
textDecoration:"none"
}}
>

Dashboard

</Link>

<Link
to="/upload"
style={{
color:"white",
textDecoration:"none"
}}
>

Upload

</Link>

</div>

</nav>

);

}

export default Navbar;