import React, { useContext, useState } from 'react'
import PostHeader from './Card/PostHeader'
import { AuthContext } from '../Context/AuthContext'
import DropdownAction from './DropdownAction'
import { Input, Button, addToast, ToastProvider } from '@heroui/react'
import { updateCommentApi } from '../Services/createComment'

export default function Comment({ comment, postUserId, callback }) {
    const { userData } = useContext(AuthContext)
    const [editingComment, setEditingComment] = useState(false)
    const [editContent, setEditContent] = useState(comment?.content || '')
    const [loading, setLoading] = useState(false)
    const [placement] = React.useState("top-center");

    if (!comment) return null

    async function handleUpdateComment() {
        if (editContent.length < 2) return
        setLoading(true)
        const response = await updateCommentApi(comment._id, { content: editContent })
        if (response.message) {
            comment.content = editContent 
            setLoading(false)
            setEditingComment(false)
            addToast({
                    title: "Success",
                    description: "Comment updated successfully",
                    color: "success",
                })
            if (typeof callback === 'function') await callback()
        }
        else{
            addToast({
                    title: "Error",
                    description: response.error || "Cannot update comment",
                    color: "danger",
                })
        }
    }

    function cancelEdit() {
        setEditingComment(false)
        setEditContent(comment.content)
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
        <div className="bg-gray-200 -mx-3 -mb-3 p-4 rounded-b-md dark:bg-gray-700">
            <div className="flex justify-between items-center">

                {/* <PostHeader name={comment.commentCreator.name} photo={comment.commentCreator.photo} date={comment.createdAt} /> */}
                <PostHeader
                    name={comment.commentCreator.name}
                    photo={comment.commentCreator._id === userData?._id ? userData.photo : comment.commentCreator.photo}
                    date={comment.createdAt}
                />

                {userData?._id === comment?.commentCreator?._id && userData?._id === postUserId && (
                    <DropdownAction
                        commentId={comment._id}
                        callback={callback}
                        onEditClick={() => setEditingComment(true)}
                    />
                )}
            </div>

            {editingComment ? (
                <div className="flex gap-2 mt-2 dark:bg-gray-700">
                    <Input className='dark:border-gray-200' value={editContent} onChange={(e) => setEditContent(e.target.value)} variant="bordered" />
                    <Button isLoading={loading} onClick={handleUpdateComment} color="primary" className='dark:bg-gray-900' >
                        Save
                    </Button>
                    <Button onClick={cancelEdit} color="danger" className='dark:bg-red-950'>
                        Cancel
                    </Button>
                </div>
            ) : (
                <p className="p-4">{comment.content}</p>
            )}
        </div>
                </>
    
}
