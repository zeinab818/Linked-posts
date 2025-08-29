import axios from "axios";


export  function getAllPostsApi() {
    
        return axios.get('https://linked-posts.routemisr.com/posts',{
            headers:{
                token:localStorage.getItem('token'),
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            params:{
                limit : 55,
                sort : '-createdAt',
            }
        })   
}



export function getSinglePostsApi(postId) {
    
        return axios.get('https://linked-posts.routemisr.com/posts/'+ postId,{
            headers:{
                token:localStorage.getItem('token')
            }
            
        })

}

export async function deletePostApi(postId) {
    
    try{
        let {data}= await axios.delete('https://linked-posts.routemisr.com/posts/'+ postId ,{
            headers:{
                token:localStorage.getItem('token'),
                Authorization: "Bearer " + localStorage.getItem("token") 
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


export async function updatePostApi(postId, formData) {
    try {
        const res = await axios.put(
            `https://linked-posts.routemisr.com/posts/${postId}`,
            formData,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        );

        return res.data;
    } catch (error) {
        console.error(error);
        return { message: false };
    }
}
