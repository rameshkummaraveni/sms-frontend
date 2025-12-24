import React, { useRef, useState, useEffect } from 'react';

const useDebounce = (query, delay=300) => {
  const [debounceValue, setDebounceValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay])
  return debounceValue;
}

export default useDebounce;