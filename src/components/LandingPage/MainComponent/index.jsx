import React from 'react'
import "./styles.css"
import Button from '../../Common/Button/Button'


function MainComponent() {
  return (
    <div className='flex-info'>
        <div className='left-component'>
            <h1 className='track-crypto'>Track Crypto</h1>
            <h1 className='real-time-heading'>Real Time</h1>
            <p className='info-text'>Lorem ipsum dolor sit amet edit quia rerum fugit ullam atque  Pariatur eum voluptas ad maxime ea!</p>
            <div className='btn-flex'>
                <Button text={"Dashboard"} />
                <Button text={"Share"} />

            </div>
        </div>
        <div>Phone</div>
      
    </div>
  )
}

export default MainComponent
