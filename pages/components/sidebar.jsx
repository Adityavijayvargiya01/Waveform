import React from 'react'
import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Waveform } from "@phosphor-icons/react";


const sidebar = () => {
  const {data:session} = useSession()
  const [x , setX] = useState('')
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    async function f(){
    if(session && session.accessToken){
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { 'Authorization': `Bearer ${session.accessToken}` }
      })
     
      const data = await response.json()
      setPlaylists(data.items)
      console.log(data)
      }
    }
    f()
  }, [session])
  return (
    <div className='w-64 grow-0 text-neutral-400 shrink-0 border-r border-neutral-900 flex flex-col p-5 space-y-4 text-sm'>

        <div className='flex items-center space-x-2 text-3xl text-white'><Waveform size={50} color="#1db954" /><span>Waveform</span></div>
        
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className='w-6 h-6' /> 
            <p>Home</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <MagnifyingGlassIcon className='w-6 h-6' /> 
            <p>Search</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <BuildingLibraryIcon className='w-6 h-6' /> 
            <p>Library</p>
            </button>

            <hr className='border-black'/>

            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className='w-6 h-6' /> 
            <p>Create Playlist</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className='w-6 h-6' /> 
            <p>Liked Songs</p>
            </button>
            
            <hr className='border-neutral-900'/>

            {playlists.map((playlist) => <div key={playlist.id} className='cursor-default hover:text-white '>{playlist.name}</div>)}
            

        

    </div>
  )
}

export default sidebar