import axios from "axios";

export async function sendRegisterData(userData) {
    
    try{
        let {data}= await axios.post('https://linked-posts.routemisr.com/users/signup',userData)
        console.log(data);
        return data;
    
    }
    catch(err){
        console.log(err.response.data);
        return err.response.data;
        
    }
}

export async function sendLoginData(userData) {
    
    try{
        let {data}= await axios.post('https://linked-posts.routemisr.com/users/signin',userData)
        console.log(data);
        return data;
    
    }
    catch(err){
        console.log(err.response.data);
        return err.response.data;
        
    }
}