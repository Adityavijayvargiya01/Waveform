import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Waveform } from '@phosphor-icons/react' 


const Sidebar = ({ view, setView, setGlobalPlaylistId }) => {
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])
    // console.log(session.user.accessToken)
    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                const response = await fetch("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })
                const data = await response.json()
                setPlaylists(data.items)
            }
        }
        f()
    }, [session])
    return (
        <div className='w-64 text-neutral-400 grow-0 shrink-0 h-screen overflow-y-scroll border-r border-neutral-900 p-5 text-sm hidden md:inline-flex'>
            <div className='space-y-4'>

            <div className='flex items-center space-x-2 mb-3 text-3xl font-Semibold text-white'><Waveform size={70} color="#9862FE" /><span>Waveform</span></div>
        

                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button onClick={() => setView("search")} className={`flex items-center space-x-2 hover:text-white ${view == "search" ? "text-white" : null}`}>
                    <MagnifyingGlassIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button onClick={() => setView("library")} className={`flex items-center space-x-2 hover:text-white ${view == "library" ? "text-white" : null}`}>
                    <BuildingLibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-black' />
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <hr className='border-neutral-900' />
                {
                    playlists.map((playlist) => {
                        return (
                            <p
                                onClick={() => {
                                    setView("playlist")
                                    setGlobalPlaylistId(playlist.id)
                                }}
                                key={playlist.id}
                                className='cursor-default hover:text-white w-52 truncate'
                            >
                                {playlist.name}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Sidebar;
