import React from 'react';

// You can import other components if needed
// import AnotherComponent from './AnotherComponent';

const About = () => {
  return (
    <div className="About-container">
      <h1>Welcome to the About Page</h1>
      <p>This is where your content goes. Feel free to add more sections here.</p>
      
      {/* Example of a button */}
      <button onClick={() => alert('Button clicked!')}>Click Me</button>
      
      {/* Example of rendering another component */}
      {/* <AnotherComponent /> */}
    </div>
  );
};

export default About;
