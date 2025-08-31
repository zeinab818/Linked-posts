import { getUserPostsApi } from "../Services/profileServices";
import PostCard from "../Components/PostCard";
import LoaadingScreen from "../Components/LoaadingScreen";
import { AuthContext } from "../Context/AuthContext";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function ProfilePage() {
  const { userData } = useContext(AuthContext);
  const { id } = useParams();
  const userId = id || userData?._id;

  const { data: posts, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPostsApi(userId),
    select: (res) => res?.data?.user?.posts ?? res?.data?.posts ?? [],
    enabled: !!userId,            
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoaadingScreen />;

  if (isError) {
    return (
      <div className="text-center min-h-screen text-3xl flex justify-center items-center flex-col gap-3">
        <h2>{error.message}</h2>
        <Button onPress={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <>
      <div className="dark:bg-gray-700 dark:text-gray-100 mt-8 py-5 px-3 bg-gray-200 rounded-3xl text-2xl lg:w-1/2 md:w-2/3 sm:w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 dark:text-gray-100">
            <img
              src={userData?.photo}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{userData?.name}</span>
          </div>
          <Dropdown>
            <DropdownTrigger >
              <svg className="w-7 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </DropdownTrigger>
            <DropdownMenu 
            aria-label="Static Actions" 
            className="bg-white dark:bg-gray-900 text-black dark:text-white"
          >  
            <DropdownItem key="upload" as={NavLink} to="/uploadPhoto" 
              className="hover:text-blue-500 dark:text-gray-100"
            >
              Upload Photo
            </DropdownItem>
            <DropdownItem key="changePass" as={NavLink} to="/changePassword" 
              className="hover:text-blue-500 dark:hover:text-blue-400"
            >
              Change Password
            </DropdownItem>
          </DropdownMenu>

          </Dropdown>
        </div>
      </div>

     {Array.isArray(posts) && posts.length > 0 ? (
  <div className="lg:w-1/2 md:w-2/3 sl:w-full mx-auto mt-5">
    {[...posts] // نعمل نسخة عشان ما نعدلش على الأصل
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // الأحدث الأول
      .map((post) => (
        <PostCard
          key={post._id || post.id}
          post={post}
          commentLimit={false}
          callback={refetch}
        />
      ))}
  </div>
) : (
  <p className="text-center pt-3">No posts</p>
)}

    </>
  );
}
