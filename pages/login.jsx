import { signIn } from 'next-auth/react'
import React from 'react'

export default function login() {
  return (
    <div className='flex items-center justify-center'>

        <button onClick = {() => signIn('spotify',{callbackUrl: "/"})}> Login with Spotify </button>

    </div>
  )
}
