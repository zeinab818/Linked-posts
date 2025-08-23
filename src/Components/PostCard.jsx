import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import PostHeader from './Card/PostHeader'
import PostBody from './Card/PostBody'
import PostFooter from './Card/PostFooter'
import Comment from './Comment'
import { Button, Input } from '@heroui/react'
import { createCommentApi, getPostCommentsApi } from '../Services/createComment'
import DropdownAction from './DropdownAction'
import CreatePost from './Card/CreatePost'

export default function PostCard({ post, commentLimit, callback }) {
    const { userData } = useContext(AuthContext)
    const inputRef = useRef(null)

    const focusInput = () => {
        if (inputRef.current) inputRef.current.focus()
    }

    const [commentContent, setCommentContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState(post.comments || [])

    const [editingPost, setEditingPost] = useState(false)
    const [editData, setEditData] = useState({ body: post.body, image: post.image, id: post.id })

    async function createComment(e) {
        e.preventDefault()
        setLoading(true)
        const response = await createCommentApi(post.id, commentContent)
        if (response.message) {
            setComments(response.comments) // يحدث الكومنتات فورًا
            setCommentContent('')
            if (typeof callback === 'function') await callback() // لتحديث البوستات لو حابة
        }
        setLoading(false)
    }

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
    }

    return (
        <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
            <div className="flex justify-between items-center h-16 w-full">
                <PostHeader
            photo={userData?._id === post?.user?._id ? userData.photo : post.user.photo}
            name={post.user.name}
            date={post.createdAt}
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
                            placeholder="commmnt........"
                        />
                        <Button isLoading={loading} type="submit" disabled={commentContent.length < 2} color="primary">
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
    )
}
