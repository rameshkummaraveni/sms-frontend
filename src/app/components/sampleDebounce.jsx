import React, { useRef, useState, useEffect } from 'react';
import useDebounce from './useDebounce';

const SampleDebounce = () => {
  const [query, setQuery] = useState("");

  const deboucedValue = useDebounce(query, 500);
  const [enteredText, setEnteredText] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    if(deboucedValue) {
        setEnteredText(deboucedValue);
    }
  }, [deboucedValue])
  
  return (
    <>
        <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e)}
        />
        {enteredText}
    </> 
  )
}

export default SampleDebounce;