// Navbar Implementation 
import React from 'react'



export default function Navbar() {
  return (
    <div className='navbar'>
        
        <a href='/'>
            <h2 className='title'>Banking App</h2>
        </a>
        

        <a href='/signup'>
            <h3 className='signup'> Sign Up </h3>
        </a>

        {/* <img src={image} alt="" />         */}
        
    </div>
  )
}
