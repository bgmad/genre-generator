import React, { useState, useEffect } from 'react';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <br />
      Response text: {responseText}
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <GetGenre/>
    </div>
  );
}

export default App;