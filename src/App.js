import React, { useState } from 'react';
import './App.css'

function GetGenre() {
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setIsLoading(true);

    // Make the API call
    fetch('https://binaryjazz.us/wp-json/genrenator/v1/genre/')
      .then((response) => response.text())
      .then((text) => {
        setResponseText(text);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div className='loading'>
      <span>Loading...</span>
    </div>;
  }

  return (
    <div>
      <button onClick={handleClick}>Generate</button>
      <p>
        {responseText}
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Find a new genre</h1>
      <GetGenre/>
    </div>
  );
}

export default App;