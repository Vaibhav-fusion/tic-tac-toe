import React from 'react'

function Box({value}) {
  return (
    <button className='w-30 h-30 flex justify-center items-center text-3xl font-bold border-2 border-gray-400 bg-white'>{value}</button>
  )
}

export default Box