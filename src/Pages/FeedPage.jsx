
import PostCard from "../Components/PostCard";
import { getAllPostsApi } from "../Services/postServices";
import LoaadingScreen from "../Components/LoaadingScreen";
import CreatePost from "../Components/Card/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/react";




export default function FeedPage() {

    // const [posts, setPosts] = useState([])

    // async function getAllPosts() {
    //     const response= await getAllPostsApi();
    //     setPosts(response.posts)
        
    // }
    // useEffect(()=>{
    //     getAllPosts();
    // },[])
    const {data : posts ,isLoading ,isError,error,refetch}=useQuery({
        queryKey:['posts'],
        queryFn:getAllPostsApi,
        select:(data)=>data?.data.posts,
        retry:0,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
    })

    return <>
            
        {/* <div className="lg:w-1/2 md:w-2/3 sl:w-full mx-auto ">
            <CreatePost callback={getAllPosts}/>
            {posts.length==0?<LoaadingScreen/>:
            posts.map((post) => <PostCard key={post.id} post={post}
            commentLimit={false} callback={getAllPosts} /> )}
        </div> */}
        <div className="div lg:w-1/2 md:w-2/3 sl:w-full mx-auto ">
            <CreatePost callback={refetch}/>
            {isLoading? <LoaadingScreen/>: isError?
            <div className="div text-center min-h-screen text-3xl flex justify-center items-center flex-col gap-3">
                <h2>{error.message}</h2>
                <Button onPress={refetch}>Retry</Button>
            </div>
            :
            posts.map((post) => <PostCard key={post.id} post={post}
            commentLimit={false} callback={refetch} />)}
        </div>

    </>
}
