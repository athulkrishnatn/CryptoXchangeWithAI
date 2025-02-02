import { useState } from 'react'
import './App.css'
import Header from './components/Common/Header'
import MainComponent from './components/LandingPage/MainComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header/>
        <MainComponent/>
       
      </div>
    
    </>
  )
}

export default App
