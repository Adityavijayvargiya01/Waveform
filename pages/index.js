import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Sidebar from './components/Sidebar'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Playlistview from "@/pages/components/Playlistview";
import Search from "@/pages/components/Search";
import Library from "@/pages/components/Library";
import Artist from "@/pages/components/Artist";


export default function Home() {
  const [view , setView] = useState('search') 
  const [globalPlaylistId , setGlobalPlaylistId] = useState(null)
  const [globalArtistId , setGlobalArtistId] = useState(null)

  return (
    <>
    <main className='flex w-full h-screen overflow-hidden overflow-y-scroll bg-black'>
      <Sidebar 
      view={view}
      setView={setView}
      setGlobalPlaylistId={setGlobalPlaylistId}
      />
      {view === 'playlist' && <Playlistview
          globalPlaylistId={globalPlaylistId}
      />}
      {view === 'search' && <Search />}
      {view === 'library' && <Library/>}
      {view === 'artist' && <Artist />}
    </main>
    </>
  )
}
