
import { getSinglePostsApi } from '../Services/postServices';
import PostCard from '../Components/PostCard';
import LoaadingScreen from '../Components/LoaadingScreen';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@heroui/react';
import { useParams } from 'react-router-dom';

export default function PostDetailsPage() {
    

    // const [post, setPost] = useState(null)
    // const {id}=useParams();
    // async function getPost() {
    //     const reponse= await getSinglePostsApi(id);
    //     if(reponse.message){
    //         setPost(reponse.post);
    //     }
        
    // }
    // useEffect(()=>{
    //     getPost();
    // },[])
    const { id } = useParams();
        const {data : post ,isLoading ,isError,error,refetch}=useQuery({
        queryKey:['post',id],
        queryFn:()=>getSinglePostsApi(id),
        select:(data)=>data?.data.post,
        retry:0,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
    })
    return<>
        <div className="lg:w-1/2 md:w-2/3 sl:w-full mx-auto">
            {isLoading? <LoaadingScreen/>: isError?
            <div className="div text-center min-h-screen text-3xl flex justify-center items-center flex-col gap-3">
                <h2>{error.message}</h2>
                <Button onPress={refetch}>Retry</Button>
            </div>
            :
            post? <PostCard post={post} commentLimit={true}callback={refetch} /> : <LoaadingScreen/>}


        </div>
    </>
}
