import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import { getAllPostsApi } from "../Services/postServices";
import LoaadingScreen from "../Components/LoaadingScreen";
import CreatePost from "../Components/Card/CreatePost";



export default function FeedPage() {

    const [posts, setPosts] = useState([])

    async function getAllPosts() {
        const response= await getAllPostsApi();
        setPosts(response.posts)
        
    }
    useEffect(()=>{
        getAllPosts();
    },[])
    return <>
            
        <div className="lg:w-1/2 md:w-2/3 sl:w-full mx-auto ">
            <CreatePost callback={getAllPosts}/>
            {posts.length==0?<LoaadingScreen/>:
            posts.map((post) => <PostCard key={post.id} post={post}
            commentLimit={false} callback={getAllPosts} /> )}
        </div>

    </>
}
