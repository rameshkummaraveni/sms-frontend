import { useState } from 'react'
import './App.css'
import SampleDebounce from './app/components/sampleDebounce';
import AutoComplete from './app/components/AutoComplete';
import SampleAutoComplete from './app/components/sampleAutoComplete';
import StudentComponent from './app/components/StudentComponent';
import FileTree from './app/components/FileTree';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      {/* <StudentComponent /> */}
      {/* <FileTree /> */}
      {/* <SampleDebounce /> */}
      <SampleAutoComplete />
      {/* <AutoComplete /> */}
    </div>
  )
}

export default App
