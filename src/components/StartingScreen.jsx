import React, { useContext } from 'react'
import { gameContext } from '../App'

export default function StartingScreen({data}) {
    const {gameStatus, setGameStatus} = useContext(gameContext)
    
    const clickHandler = () => {
        setGameStatus('Started')
    }
    if(gameStatus!== 'Not Started') return
  return (
    <div className='w-full'>
        <h3 className='text-lg text-neutral-700'>Duration {data.duration} mins</h3>
        <h2 className='text-2xl font-semibold mt-3'>{data.title}</h2>
        <h2 className='text-2xl mt-1 tracking-tight leading-7 italic text-neutral-600'>Topic : {data.topic}</h2>

        <button onClick={clickHandler} className='mt-10 w-full text-center py-3 bg-black text-white text-xl font-bold rounded-xl cursor-pointer hover:opacity-90 active:scale-95'>
            Start Test
        </button>
    </div>
  )
}