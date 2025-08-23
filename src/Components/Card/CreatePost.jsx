import React, { useState } from 'react'
import { Button, Spinner } from '@heroui/react'
import { createPostApi } from '../../Services/createPostService'
import { updatePostApi } from '../../Services/postServices'

export default function CreatePost({ callback, initialData, cancelEdit }) {
    const [postBody, setPostBody] = useState(initialData?.body || '')
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(initialData?.image || null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('body', postBody)
        if (image) formData.append('image', image)

        const response = initialData
            ? await updatePostApi(initialData.id, formData)
            : await createPostApi(formData)

        if (response.message) {
            await callback()
            setPostBody('')
            setImage(null)
            setImageURL(null)
            if (cancelEdit) cancelEdit()
        }
        setLoading(false)
    }

    function handleImage(e) {
        setImage(e.target.files[0])
        setImageURL(URL.createObjectURL(e.target.files[0]))
        e.target.value = ''
    }

    return (
        <div className="relative bg-white w-full rounded-md shadow-md py-3 px-3 my-5">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    placeholder="Create Post, What's on Your Mind...."
                    className="border bg-gray-100 resize-none rounded-2xl w-full p-4"
                    rows={4}
                />
                {imageURL && (
                    <div className="relative">
                        <img className="w-full h-80" src={imageURL} alt="image" />
                        <svg
                            onClick={() => setImageURL('')}
                            className="absolute top-4 end-4 cursor-pointer size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"

                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <label className="cursor-pointer hover:text-blue-600 flex items-center gap-3">
                        <input type="file" hidden onChange={handleImage} />
                        <span>Image</span>
                    </label>
                    <div className="flex gap-2">
                        {cancelEdit && (
                            <Button color="secondary" onClick={cancelEdit}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" color="primary">
                            {initialData ? 'Update' : 'Post'}
                        </Button>
                    </div>
                </div>

                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-300/50">
                        <Spinner />
                    </div>
                )}
            </form>
        </div>
    )
}
