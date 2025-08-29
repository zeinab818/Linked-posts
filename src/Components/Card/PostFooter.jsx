import React from 'react'
import { Link } from 'react-router-dom'


export default function PostFooter({commentNumbers ,postId,onCommentClick}) {
    return <>
            <div className="w-full h-8 flex items-center px-3 my-3">
                    <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
                        <svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                    </div>
                    <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                        <svg className="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </div>
                <div className="w-full flex justify-between">
                    <p className="ml-3 text-gray-500">{Math.floor(Math.random() * 1000)}</p>
                    <Link to={'/post-details/'+postId}><p className="ml-3 text-gray-500">{commentNumbers} comments</p></Link>
                </div>
                </div>
                <div className="grid grid-cols-2 w-full  px-5 my-3 pt-5 border-t border-divider">
                    <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                        <span className="font-semibold text-lg text-gray-600">like</span></button>
                    <button  onClick={onCommentClick} className="cursor-pointer flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        <span className="font-semibold text-lg text-gray-600">comment</span></button>
                    
                </div>
    </>
}
