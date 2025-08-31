import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import PostHeader from './Card/PostHeader'
import PostBody from './Card/PostBody'
import PostFooter from './Card/PostFooter'
import Comment from './Comment'
import { addToast, Button, Input, ToastProvider } from '@heroui/react'
import { createCommentApi, getPostCommentsApi } from '../Services/createComment'
import DropdownAction from './DropdownAction'
import CreatePost from './Card/CreatePost'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../main'

export default function PostCard({ post, commentLimit, callback }) {
    const { userData } = useContext(AuthContext)
    const inputRef = useRef(null)

    const focusInput = () => {
        if (inputRef.current) inputRef.current.focus()
    }

    const [commentContent, setCommentContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState(post.comments || [])
    const [placement, setPlacement] = React.useState("top-center");


    const [editingPost, setEditingPost] = useState(false)
    const [editData, setEditData] = useState({ body: post.body, image: post.image, id: post.id })

    async function createComment(e) {
        e.preventDefault()
        setLoading(true)
        const response = await createCommentApi(post.id, commentContent)
        if (response.message) {
            setLoading(false)
            setComments(response.comments)
            addToast({
                title: "Success",
                description: "comment created successfully",
                color: "success",
            })
            setCommentContent('')
            // if (typeof callback === 'function') await callback() 
            //     addToast({
            //         title: "Success",
            //         description: "comment created successfully" ,
            //         color: "success",
            //     })
        }
        // setLoading(false)
    }
    // let {mutate:createComment,isPending}=useMutation({
    //     mutationKey:['create-comment'],
    //     mutationFn:({postId,content})=>createCommentApi(post.id, commentContent),
    //     onSuccess: async (data)=>{
    //         setCommentContent('')
    //         await queryClient.invalidateQueries(['posts'])

    //     },
    // })

    async function getPostComments() {
        const response = await getPostCommentsApi(post.id)
        if (response.message) {
            setComments(response.comments)
            setCommentContent('')
        }
    }

    function handleEditPost() {
        setEditingPost(true)
        setEditData({ body: post.body, image: post.image, id: post.id })
    }

    function cancelEdit() {
        setEditingPost(false)
        addToast({
            title: "Cancelled",
            description: "Edit cancelled",
            color: "warning",
        })
    }

    return <>
        <div className="fixed z-[100]">
            <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0} />
        </div>

        <div className="bg-white dark:bg-gray-900 dark:text-gray-100 w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
            <div className="flex justify-between items-center h-16 w-full">
                <PostHeader
                    photo={userData?._id === post?.user?._id ? userData.photo : post.user.photo}
                    name={post.user.name}
                    date={new Date(post.createdAt).toISOString()}
                />


                {userData?._id === post?.user?._id && (
                    <DropdownAction
                        postId={post.id}
                        callback={callback}
                        onEditClick={handleEditPost}
                    />
                )}
            </div>

            {editingPost ? (
                <CreatePost initialData={editData} cancelEdit={cancelEdit} callback={callback} />
            ) : (
                <PostBody body={post.body} image={post.image} />
            )}

            {!editingPost && (
                <>
                    <PostFooter onCommentClick={focusInput} postId={post.id} commentNumbers={comments.length} />
                    <form onSubmit={createComment} className="flex gap-2 mb-3">
                        <Input
                            ref={inputRef}
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            variant="bordered"
                            placeholder="comment........"
                        />
                        <Button className='dark:bg-gray-700 px-6' isLoading={loading} type="submit" disabled={commentContent.length < 2} color="primary">
                            Add comment
                        </Button>
                    </form>

                    {comments.length > 0 && commentLimit
                        ? comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                postUserId={post.user._id}
                                callback={getPostComments}
                            />
                        ))
                        : comments[0] && <Comment comment={comments[0]} postUserId={post.user._id} />}
                </>
            )}
        </div>
    </>

}
