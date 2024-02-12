import React, {useEffect, useState} from 'react';
import { useSession } from 'next-auth/react'
import {ChevronDownIcon} from "@heroicons/react/24/outline";


const Playlistview = ({globalPlaylistId}) => {
    const {data:session} = useSession()
    console.log(session)
    const [playlistData , setPlaylistData] = useState(null)
    useEffect(() =>{
        async function f(){
            if(session && session.accessToken){
                const response = await fetch(`https://api.spotify.com/v1/playlists/${globalPlaylistId}`, {
                    headers:
                        {
                            Authorization: `Bearer ${session.accessToken}`
                        }
                })
                const data = await response.json()
                setPlaylistData(data)
                console.log(data)

            }
        }
        f()
    },[session , globalPlaylistId])
    return (
        <div className='flex-grow h-screen overflow-hidden'>
            <header className='text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold'>
                <div>{playlistData?.name}</div>
            </header>
            <div className='absolute z-20 top-5 right-8 flex items-center bg-opacity-70 bg-black text-white space-x-4 opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-9 h-9' src={session?.user.image} alt='profile_img'/>
                <p className='text-sm'>{session?.user.name}</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
        </div>
    );
};

export default Playlistview;