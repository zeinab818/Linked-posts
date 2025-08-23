import axios from "axios";

export async function createCommentApi(postId,commentContent) {
    
    try{
        let {data}= await axios.post('https://linked-posts.routemisr.com/comments',{
            post : postId,
            content : commentContent,
            },{
            headers:{
                token:localStorage.getItem('token'),
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


export async function deleteCommentApi(commentId) {
    
    try{
        let {data}= await axios.delete('https://linked-posts.routemisr.com/comments/'+ commentId ,{
            headers:{
                token:localStorage.getItem('token'),
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



export async function getPostCommentsApi(postId) {
    
    try{
        let {data}= await axios.get('https://linked-posts.routemisr.com/posts/'+ postId +'/comments' ,{
            headers:{
                token:localStorage.getItem('token'),
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

export async function updateCommentApi(commentId ,commentContent) {
    try {
        const res = await axios.put(
            `https://linked-posts.routemisr.com/comments/${commentId}`,commentContent,
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
