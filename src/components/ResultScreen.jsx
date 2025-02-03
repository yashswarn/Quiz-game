import React, { useContext } from 'react'
import { gameContext } from '../App'
import ReactConfetti from 'react-confetti'
import { catGifs } from '../constant'


export default function ResultScreen() {
    const {gameStatus, setGameStatus, score, setScore} = useContext(gameContext)
    
    const clickHandler = () => {
        setScore(0)
        setGameStatus('Not Started')
    }

    const catImageHandler = () =>{
        if(score<3) return catGifs.notok
        else if(score>3 && score<6) return catGifs.okok
        else return catGifs.veryok
    }
    if(gameStatus!== 'Finished') return
  return (
    <div className='w-full'>
        <ReactConfetti/>
        <h2 className='text-2xl text-center mt-5 mb-3'>Your Score is <span className='font-semibold'>{score}</span></h2>
        <img  className='w-full' src={catImageHandler()} alt="" srcset="" />
        <button onClick={clickHandler} className='mt-10 w-full text-center py-3 bg-black text-white text-xl font-bold rounded-xl cursor-pointer hover:opacity-90 active:scale-95'>
            Restart
        </button>
    </div>
  )
}