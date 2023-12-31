import React from 'react'
import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Waveform } from "@phosphor-icons/react";



const sidebar = ({view , setView ,setGlobalPlaylistId}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data:session} = useSession()
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [x , setX] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [playlists, setPlaylists] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function f(){
    if(session && session.accessToken){
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { 'Authorization': `Bearer ${session.accessToken}` }
      })
     
      const data = await response.json()
      setPlaylists(data.items)
      }
    }
    f()
  }, [session])
  return (
    <div className='w-64 grow-0 text-neutral-400 shrink-0 border-r  border-neutral-900 flex flex-col p-5 space-y-4 text-sm'>

        <div className='flex items-center space-x-2 mb-3 text-3xl text-white'><Waveform size={50} color="#1db954" /><span>Waveform</span></div>
        
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className='w-6 h-6' /> 
            <p>Home</p>
            </button>

            <button onClick={() => setView("search")} className={`flex items-center space-x-2 hover:text-white ${view === "search" ? "text-white" : null }`}>
                <MagnifyingGlassIcon className='w-6 h-6' /> 
            <p>Search</p>
            </button>

            <button onClick={() => setView("library")} className={`flex items-center space-x-2 hover:text-white ${view === "library" ? "text-white" : null }`}>
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

            {
              playlists.map((playlist) => {
              return <p
                  onClick={() => {
                      setView("playlist")
                      setGlobalPlaylistId(playlist.id)
                  }}
                  key={playlist.id}
                  className='cursor-default hover:text-white w-52'>{
                  playlist.name}
                  </p>
              })

            }
            

        

    </div>
  )
}

export default sidebar