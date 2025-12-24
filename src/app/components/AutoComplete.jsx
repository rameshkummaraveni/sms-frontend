import { useState, useMemo } from 'react';
import useDebounce from './useDebounce';

const cities = [
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Indore',
  'Bhopal',
  'Nagpur',
  'Visakhapatnam'
];

const AutoComplete = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const filteredCities = useMemo(() => {
    if (!debouncedQuery) return [];

    return cities.filter(city =>
      city.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  const handleSelect = (city) => {
    setQuery(city);
  };

  return (
    <div style={{ width: '300px', position: 'relative' }}>
      <input
        type="text"
        value={query}
        placeholder="Search city..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />

      {filteredCities.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            border: '1px solid #ccc',
            position: 'absolute',
            width: '100%',
            background: '#fff',
            zIndex: 10
          }}
        >
          {filteredCities.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              style={{
                padding: '8px',
                cursor: 'pointer'
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;