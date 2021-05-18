# React

## What is JSX?
* JSX is a syntax extension for JavaScript. It was written to be used with React. If a JavaScript file contains JSX code, then that file will have to be compiled.

* A basic unit of JSX is called a JSX element

* a JSX expression must have exactly one outermost element. The first opening tag and the final closing tag of a JSX expression must belong to the same JSX element!

* ReactDOM is the name of a JavaScript library. This library contains several React-specific methods, all of which deal with the DOM in some way or another. `ReactDOM.render()` is the most common way to render JSX. It takes a JSX expression, creates a corresponding tree of DOM nodes, and adds that tree to the DOM. That is the way to make a JSX expression appear onscreen.


### Virtual DOM

[Virtual DOM](https://www.codecademy.com/articles/react-virtual-dom)

In React, for every DOM object, there is a corresponding “virtual DOM object.”

Once the virtual DOM has updated, then React compares the virtual DOM with a virtual DOM snapshot that was taken right before the update.

By comparing the new virtual DOM with a pre-update version, React figures out exactly which virtual DOM objects have changed. This process is called “diffing.”

Once React knows which virtual DOM objects have changed, then React updates those objects, and only those objects, on the real DOM. 


In summary, here’s what happens when you try to update the DOM in React:

1. The entire virtual DOM gets updated.
2. The virtual DOM gets compared to what it looked like before you updated it. React figures out which objects have changed.
3. The changed objects, and the changed objects only, get updated on the real DOM.
4. Changes on the real DOM cause the screen to change.


### Grammer diffs between HTML and JSX
* class vs className:

In JSX, you can’t use the word class! You have to use className instead. This is because JSX gets translated into JavaScript, and class is a reserved word in JavaScript.

When JSX is rendered, JSX className attributes are automatically rendered as class attributes.


* self-closing tags:

When you write a self-closing tag in HTML, it is optional to include a forward-slash immediately before the final angle-bracket, But!

In JSX, you have to include the slash

* curly braces in JSX

Everything inside of the curly braces will be treated as regular JavaScript.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function makeDoggy(e) {
  // Call this extremely useful function on an <img>.
  // The <img> will become a picture of a doggy.
  e.target.setAttribute('src', 'https://content.codecademy.com/courses/React/react_photo-puppy.jpeg');
  e.target.setAttribute('alt', 'doggy');
}

const kitty = (
	<img 
		src="https://content.codecademy.com/courses/React/react_photo-kitty.jpg" 
		alt="kitty" 
    onClick={makeDoggy}/>
);

ReactDOM.render(kitty, document.getElementById('app'));
```

* JSX Conditionals: If Statements That Don't Work

you can not inject an if statement into a JSX expression.

You can either use if statements outside JSX expression or use tenary operator
```java
import React from 'react';
import ReactDOM from 'react-dom';

function coinToss () {
  // Randomly return either 'heads' or 'tails'.
  return Math.random() < 0.5 ? 'heads' : 'tails';
}

const pics = {
  kitty: 'https://content.codecademy.com/courses/React/react_photo-kitty.jpg',
  doggy: 'https://content.codecademy.com/courses/React/react_photo-puppy.jpeg'
};

const img = <img src={pics[coinToss() === 'heads' ? 'kitty' : 'doggy']} />;

ReactDOM.render(
	img, 
	document.getElementById('app')
);
```

Or you can use `&&` operator:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// judgmental will be true half the time.
const judgmental = Math.random() < 0.5;

const favoriteFoods = (
  <div>
    <h1>My Favorite Foods</h1>
    <ul>
      <li>Sushi Burrito</li>
      <li>Rhubarb Pie</li>
      {!judgmental && <li>Nacho Cheez Straight Out The Jar</li>}
      <li>Broiled Grapefruit</li>
    </ul>
  </div>
);

ReactDOM.render(
	favoriteFoods, 
	document.getElementById('app')
);
```

* .map in JSX
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const people = ['Rowe', 'Prevost', 'Gare'];

const peopleLis = people.map(person =>
  // expression goes here:
  <li>{person}</li>
);

// ReactDOM.render goes here:
ReactDOM.render(<ul>{peopleLis}</ul>, document.getElementById('app'));
```


* keys in Lists
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const people = ['Rowe', 'Prevost', 'Gare'];

const peopleLis = people.map((person, i) =>
  // expression goes here:
  <li key={'person_' + i}>{person}</li>
);

// ReactDOM.render goes here:
ReactDOM.render(<ul>{peopleLis}</ul>, document.getElementById('app'));
```


* React.createElement()

You can write React code without using JSX at all! Every JSX element is secretly a call to React.createElement().

```javascript
const greatestDivEver = React.createElement(
  "div",
  null,
  "i am div"
);
```
whereas in JSX
```javascript
const myDiv = (
  <div>i am div</div>
);
```


## React components (UpperCamelCase)

* import react

you have to import the React library, and save it in a variable named React, before you can use any JSX at all. React.createElement() must be available in order for JSX to work.

`The methods imported from 'react' don’t deal with the DOM at all`. They don’t engage directly with anything that isn’t part of React.

```javascript
import React from 'react';
```

* import ReactDOM

The methods imported from 'react-dom' are meant for interacting with the DOM. 

```javascript
import ReactDOM from 'react-dom';
```

* React component is a small, reusable chunk of code that is responsible for one job, which often involves rendering HTML.


* `React.Component` is a JavaScript class. To create your own component class, you must subclass React.Component. You can do this by using the syntax class `YourComponentNameGoesHere extends React.Component {}`.

- JSX elements can be either HTML-like, or component instances. JSX uses capitalization to distinguish between the two! That is the React-specific reason why `component class names must begin with capital letters`.

```javascript
import React from 'react';
//import React from 'react' creates a JavaScript object. This object contains properties that are needed to make React work, such as React.createElement() and React.Component.

import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom' creates another JavaScript object. This object contains methods that help React interact with the DOM, such as ReactDOM.render().

class MyComponentClass extends React.Component {
  //by subclassing React.Component, you create a new component class. This is not a component! A component class is more like a factory that produces components. When you start making components, each one will come from a component class.

  render() {
    return <h1>Hello world</h1>;
  }
}

ReactDOM.render(
	<MyComponentClass />, 
	document.getElementById('app')
);
```


## Components and Advanced JSX

### Render function

* a multi-line JSX expression should always be wrapped in parentheses of the return statement

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const owl = {
  title: 'Excellent Owl',
  src: 'https://content.codecademy.com/courses/React/react_photo-owl.jpg'
};

// Component class starts here:
class Owl extends React.Component {
  render() {
    return( // wrapped multiline JSX in ()
      <div>
        <h1>{owl.title}</h1>
        <img src={owl.src} alt={owl.title}/>
      </div>
    )
  };
};

ReactDOM.render(<Owl />, document.getElementById('app'));
```

### Use this in a component

`this` refers to the object on which this‘s enclosing method, in this case .render(), is called.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class MyName extends React.Component {
	// name property goes here:
  get name() {
    return 'haha';
  }

  render() {
    return <h1>My name is {this.name}.</h1>;
  }
}

ReactDOM.render(<MyName />, document.getElementById('app'));
```

### Event listener in a component
* when use functions inside a component, no need to add ()

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
  scream() {
    alert('AAAAAAAAHHH!!!!!');
  }

  render() {
    return <button onClick={this.scream}>AAAAAH!</button>;
  }
}

ReactDOM.render(<Button />, document.getElementById('app'));
```

## Components interactions

### A component in a render function
```javascript
class OMG extends React.Component {
  render() {
    return <h1>Whooaa!</h1>;
  }
}
 
class Crazy extends React.Component {
  render() {
    return <OMG />;
  }
}
```


### this.props

* Passing a prop by giving an attribute to a component instance
* Accessing a passed-in prop via this.props.prop-name
* Displaying a prop
* Using a prop to make decisions about what to display
* Defining an event handler in a component class
* Passing an event handler as a prop
* Receiving a prop event handler and attaching it to an event listener
* Naming event handlers and event handler attributes according to convention
* this.props.children
* getDefaultProps

#### this.props.children

* this.props.children will return everything in between a component’s opening and closing JSX tags.
 (it is similar to slots in Vue.js)

 MyComponent.defaultProps = {propName : 'defaultValue'};


 ### State

 ```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	// constructor method begins here:
  constructor(props) {
    super(props);
    this.state = {title: 'Best App'};
  };
	
  render() {
    return (
      <h1>
        {this.state.title}
      </h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
 ```

* call this.setState from another function

* Any time that you call this.setState(), this.setState() AUTOMATICALLY calls .render() as soon as the state has changed.

* `That is why you can’t call this.setState() from inside of the .render() method! this.setState() automatically calls .render(). If .render() calls this.setState(), then an infinite loop is created.`

 ```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const green = '#39D1B4';
const yellow = '#FFD712';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: green};
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    const newColor = this.state.color === green ? yellow : green;
    this.setState({color: newColor});
  }
  render() {
    return (
      <div style={{background: this.state.color}}>
        <h1>
          <button onClick={this.changeColor}>
            Change color
          </button>
        </h1>
      </div>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById('app'));
 ```


 ### the component lifecycle

 The component lifecycle has three high-level parts:

1. `Mounting`, when the component is being initialized and put into the DOM for the first time
2. `Updating`, when the component updates as a result of changed state or changed props
3. `Unmounting`, when the component is being removed from the DOM