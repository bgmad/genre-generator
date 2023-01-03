import React, { useEffect, useRef, useState } from 'react';

const ABOUT_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
ornare erat eu ipsum pretium, at consectetur dolor varius. Ut sit amet
vehicula massa, ac porttitor leo. Ut id dapibus nulla. Curabitur
placerat, ipsum sit amet vehicula ultricies, est purus laoreet quam,
ut luctus enim diam ac neque.`;

function About() {
  const pRef = useRef(null);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const [originalText, setOriginalText] = useState(ABOUT_TEXT);

  useEffect(() => {
    const p = pRef.current;

    if (!originalText) {
      setOriginalText(p.textContent);
    }

    if (p.textContent.length > 100 && !isFullTextVisible) {
      p.textContent = p.textContent.substring(0, 120) + '...';
    } else if (isFullTextVisible) {
      p.textContent = originalText;
    }
  }, [isFullTextVisible, originalText]);

  function handleClick() {
    setIsFullTextVisible(!isFullTextVisible);
  }

  return (
    <div className='about-container'>
        <div className={`about ${isFullTextVisible ? 'open' : 'closed'}`} ref={pRef} onClick={handleClick}>
            <p>
            {ABOUT_TEXT}
            </p>
        </div>
    </div>
  );
}

export default About;