import { useState } from "react";

export default function useGet(api){
    async function [posts,setPosts]=useState([])
    {
try{
    const {data}=await axios.get(api)
}
    }

}