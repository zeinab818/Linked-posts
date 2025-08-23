import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostsApi } from '../Services/postServices';
import PostCard from '../Components/PostCard';
import LoaadingScreen from '../Components/LoaadingScreen';

export default function PostDetailsPage() {
    

    const [post, setPost] = useState(null)
    const {id}=useParams();
    async function getPost() {
        const reponse= await getSinglePostsApi(id);
        if(reponse.message){
            setPost(reponse.post);
        }
        
    }
    useEffect(()=>{
        getPost();
    },[])
    return<>
        <div className="lg:w-1/2 md:w-2/3 sl:w-full mx-auto">
            {post? <PostCard post={post} commentLimit={true}callback={getPost} /> : <LoaadingScreen/>}
        </div>
    </>
}
