import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Sidebar from './components/Sidebar'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'



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
    <>
    <main className='flex w-full h-screen overflow-hidden bg-black'>
      <Sidebar />
      <div>
        
      </div>
    </main>
    <div className='sticky bottom-0 h-20 w-full bg-red-100'></div>
    </>
  )
}
