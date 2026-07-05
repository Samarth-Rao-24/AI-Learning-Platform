import axios from "axios";

const API="http://127.0.0.1:5000";

export const uploadFile=async(file)=>{

const formData=new FormData();

formData.append("file",file);

return await axios.post(

`${API}/api/upload`,

formData

);

};