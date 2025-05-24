import React from 'react'

function Box({value,onClick}) {
  return (
    <button onClick={onClick} className='w-24 h-24 flex justify-center items-center text-3xl font-bold border-2 border-gray-400 bg-white'>{value}</button>
  )
}

export default Box