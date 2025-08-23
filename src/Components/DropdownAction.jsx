import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react'
import { deleteCommentApi } from '../Services/createComment'
import { deletePostApi } from '../Services/postServices'

export default function DropdownAction({ commentId, callback, postId, onEditClick }) {
    const [loading, setLoading] = useState(false)

    async function deleteComment(commentId) {
        setLoading(true)
        const response = await deleteCommentApi(commentId)
        if (response.message && typeof callback === 'function') await callback()
        setLoading(false)
    }

    async function deletePost(postId) {
        setLoading(true)
        const response = await deletePostApi(postId)
        if (response.message && typeof callback === 'function') await callback()
        setLoading(false)
    }

    return loading ? (
        <Spinner />
    ) : (
        <Dropdown>
            <DropdownTrigger>
                <svg className="w-16 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round">
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={19} cy={12} r={1} />
                    <circle cx={5} cy={12} r={1} />
                </svg>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit" onClick={onEditClick}>
                    {commentId ? 'Edit Comment' : 'Edit Post'}
                </DropdownItem>

                {commentId ? (
                    <DropdownItem onClick={() => deleteComment(commentId)} key="delete" className="text-danger" color="danger">
                        Delete Comment
                    </DropdownItem>
                ) : (
                    <DropdownItem onClick={() => deletePost(postId)} key="delete" className="text-danger" color="danger">
                        Delete Post
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    )
}
