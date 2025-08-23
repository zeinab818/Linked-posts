import axios from "axios";

export async function createPostApi(formData) {
    
    try{
        let {data}= await axios.post('https://linked-posts.routemisr.com/posts', formData,{
            headers:{
                token:localStorage.getItem('token'),
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
        console.log(data);
        return data;
    
    }
    catch(err){
        console.log(err.response.data);
        return err.response.data;
        
    }
}