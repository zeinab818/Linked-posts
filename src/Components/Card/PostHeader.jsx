import React from 'react'
import user from '../../assets/user.png'

export default function PostHeader({photo, name ,date}) {
    const utcDate = new Date(date);
    const formattedDate = utcDate.toISOString().replace("T", " ").split(".")[0];
    return<>
                <div className="w-full h-16  items-center flex justify-between ">
                    <div className="flex ">
                        <img onError={(e)=> e.target.src=user} className=" rounded-full w-10 h-10 mr-3" src={photo} alt={name} />
                        <div>    
                            <h3 className="text-md font-semibold text-black dark:text-gray-100">{name}</h3>
                            <p className="text-xs text-gray-500">{formattedDate}</p>
                        </div>
                    </div>
                </div>
    </>
}
