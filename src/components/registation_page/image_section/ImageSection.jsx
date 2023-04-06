import React from 'react'
import './ImageSection.css'

export default function ImageSection() {
  return (
    <section className='ImageSection'>
        <div className='HaveAnAccount'>
            <p>Already have an account?</p>
            <button className='LoginButton'>LOGIN</button>
        </div>
        <div className='DiscoverHeading'>
            <p>Discover new things on Superapp</p>
        </div>
    </section>
  )
}
