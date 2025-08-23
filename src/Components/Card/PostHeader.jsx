import React from 'react'
import user from '../../assets/user.png'

export default function PostHeader({photo, name ,date}) {
    return<>
                <div className="w-full h-16  items-center flex justify-between ">
                    <div className="flex">
                        <img onError={(e)=> e.target.src=user} className=" rounded-full w-10 h-10 mr-3" src={photo} alt={name} />
                        <div>    
                        <h3 className="text-md font-semibold ">{name}</h3>
                        <p className="text-xs text-gray-500">{date.split('.',1).join().replace('T',' ')}</p>
                        </div>
                    </div>
                </div>
    </>
}
