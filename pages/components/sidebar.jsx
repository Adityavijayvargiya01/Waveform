import React from 'react'
import { BuildingLibraryIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function sidebar() {
  return (
    <div className='w-64 grow-0 text-neutral-400 shrink-0 border-r border-neutral-800 flex flex-col p-5 space-y-4'>

        <div className=''>Waveform</div>
        
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
            
            

        

    </div>
  )
}
