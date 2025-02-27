// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import PlayerCard from "./PlayerCard";


function App() {
  // const [count, setCount] = useState(0)

  return (<div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
    <PlayerCard />
  </div>
  )
}

export default App
