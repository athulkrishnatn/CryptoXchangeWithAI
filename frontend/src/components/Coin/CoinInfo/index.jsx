import React, { useState } from 'react'
import './styles.css'

const CoinInfo = ({heading, desc}) => {
    const shortDesc = desc.slice(0,400) + "<p class='readmore' style='color:var(--grey)' >  Read More...</p>";
    const longDesc = desc + "<p class='readless' style='color:var(--grey)' >  Read Less...</p>"

    const [flag, setFlag] = useState(false)


  return (
    <div className='grey-wrapper'>
        <h2 className='coin-info-heading mt-2 ms-2 pt-2  text-2xl font-light'>{heading}</h2>
        {
            desc.length>200 ?  <p onClick={()=>setFlag(!flag)} className='coin-info-desc mt-2 ms-2 cursor-pointer font-light' dangerouslySetInnerHTML={{__html: !flag?shortDesc : longDesc}} /> 
            :
            <p className='mt-2 ms-2 cursor-pointer' dangerouslySetInnerHTML={{__html:desc}}/>

        }
        
      
    </div>
  )
}

export default CoinInfo
