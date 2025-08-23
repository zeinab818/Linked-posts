import React from 'react'

export default function PostBody({body,image}) {
    return <>
        {body && <p>{body}</p>}
                {image && <img className='w-full h-80 object-cover pt-4' src={image} alt={body} />}
    </>
}
