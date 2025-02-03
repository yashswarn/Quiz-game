import React, { useContext } from 'react'
import { useTimer } from 'react-timer-hook'
import { gameContext } from '../App'

export default function Timer({expiryTime}) {
    const {setGameStatus} = useContext(gameContext)
    const {
        seconds,
        minutes,
      } = useTimer({ expiryTimestamp: expiryTime, onExpire: () => setGameStatus('Finished')})

  return (
    <div className='font-semibold'>Time Left : <span>{minutes}</span>:<span>{seconds}</span></div>
  )
}