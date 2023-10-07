import React from 'react'
import {ReactComponent as Loading} from 'assets/animation/loading.svg'
function Overlay() {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-100 backdrop-brightness-50'>
        <Loading className='w-12 h-12'/>
    </div>  
  )
}

export default Overlay