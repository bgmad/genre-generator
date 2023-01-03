import React, { useState } from 'react';
import './App.css'
import $ from 'jquery';
import About from './About';

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


function WikipediaSearch() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    setIsLoading(true);
  
    $.ajax({
      url: `https://www.mediawiki.org/w/api.php?action=query&list=search&srsearch=${query}&srnamespace=*`,
      data: {
        action: 'query',
        meta: 'userinfo',
        format: 'json',
        origin: '*',
      },
      dataType: 'json',
    })
      .then(data => {
        console.log(data)
        setResults(data.query.search);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }
  

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.pageid}>
              <a href={`https://en.wikipedia.org/?curid=${result.pageid}`}>{result.title}</a>
              <p>{result.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Find a new genre</h1>
      <About/>
      <GetGenre/>
      <WikipediaSearch />
    </div>
  );
}

export default App;