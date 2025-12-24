import { useState } from 'react'
import './App.css'
import StudentComponent from './app/components/StudentComponent';
import FileTree from './app/components/FileTree';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
        <StudentComponent />
       {/* <FileTree /> */}
    </div>
  )
}

export default App
