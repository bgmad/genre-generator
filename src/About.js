import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const markdown = `_Random Genre_ pulls a randomly generated genre based on [Every Noise At once]('https://everynoise.com/everynoise1d.cgi?scope=deep%20only&vector=popularity') which is the database that Spotify uses to inform their genres and playlists. More information can be found at [Binary Jazz]('https://binaryjazz.us/genrenator-api/'). For the most part, this will generate a completely random, perhaps new, genre of music. Bellow is a search feature using [Media Wiki]('https://www.mediawiki.org/wiki/API:Search'), however, their search as extensive and complex, and the implementation might be wrong.`;

function About() {
  const pRef = useRef(null);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  function handleClick() {
    if (markdown.length > 120)
      setIsFullTextVisible(!isFullTextVisible);
  }

  return (
    <div className='about-container'>
        <div className={`about ${isFullTextVisible ? 'open' : 'closed'}`} ref={pRef} onClick={handleClick}>
            {isFullTextVisible ? <ReactMarkdown children={markdown} /> : <ReactMarkdown children={markdown.substring(0, 200)}/>}
        </div>
    </div>
  );
}

export default About;
