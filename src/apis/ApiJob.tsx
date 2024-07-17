import axios from "axios"

export const getField = async () =>{
    
    try{
        const response = await axios.get("http://localhost:8080/internbridge/field");
        return response.data;
    } catch (error){
        console.log(error);
        
    }

}