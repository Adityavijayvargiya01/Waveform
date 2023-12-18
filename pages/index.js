import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'


export default function Home() {
  const {data:session} = useSession()
  const [x , setX] = useState('')
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    async function f(){
    if(session && session.accessToken){
      setX(session.accessToken)
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
    <main>
        <div>
          access token: {x}
        </div>
        <div>
         playlists: {playlists.map((playlist) => (<div key={playlist.id}>{playlist.name}</div>))}
        </div>

    </main>
  )
}
