// import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// create a react component
const App = () => {
  const buttonText= { text: 'Click me!'}; //Note: react cannot render javascript object in JSX

  return (
    <div>
      <label className="label" for="name">
        Enter name: 
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: 'blue', color: 'white'}}>
        { buttonText.text }
      </button>
    </div>
  );
};

// Take the react component and show it on the screen
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

