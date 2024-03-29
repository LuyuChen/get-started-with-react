# React

- Section 1 & 2

## React && ReactDOM && useState

- React: knows how to work with components, called a 'reconciler'

- ReactDOM: knows how to take instructions on what we want to show and turn it into HTML, called a 'renderer'

- useState:
  1. function for working with React's 'state' system
  2. state is used to keep track of data that changes over time
  3. used to make React update the HTML on the screen

## Babel

new versions of javascript are not all well-supported in browsers

ES5 -> supported across all browsers

ES2015 -> almost completed supported

ES2016, ES2017, ES2018 ... -> Poor support

`Babel` can take any version of javascript into a version of javascript that the browser can support

## Module system

- ES2015 Modules: import

- ComonJS Modules: require

## React component

A component is a function or a class that produces HTML to show the user and handles feedback from the user.

## JSX

Sepcial dialect of JS (Not HTML); browsers don't understand JSX;

### JSX vs HTML

1. adding custom styling to an element uses different syntax

   html: <div style="background-color: red;"> </div>
   jsx: <div style={{ backgroundColor: 'red' }}> </div> // {{}} -> treat them as javascript objects

2. adding a class to an element uses different syntax

   html: <label class="label" for="name"> </label>
   jsx: <label className="label" htmlFor="name"> </label> // because class & for is a javascript keyword

3. JSX can reference JS variables

- Section 3

faker.js - generate massive amounts of fake data in the browser and node.js

## Component nesting

A component is a `function` or a `class` that produces HTML to show the user and handles feedback from the user.

## Functional components vs Class Components

- functional components used to be very restrictive, can only use JSX to show content to the user. Now functional components can use Hooks system to be fully functional compareing with class components

- class components:
  1.  easier code organization -> to use JSX to show content
  2.  can use `state` system to handle user input
  3.  understand lifecycle events -> easier to do things when the app first starts

Now with hook system, functional components can also achieve 2 and 3

- Section 4

## Rule of class components

1. must be a JavaScript class

2. must extend (subclass) React.Component

3. must define a 'render' method that returns some amount of JSX

- Section 5

## Rule of state

1. only usable with class components (technically can be used with functional components using the hooks system)

2. props vs state

3. 'state' is a JS object that contains data relevant to a component

4. updating 'state' on a component causes the component to (almost) instantly rerender

5. state must be initialized when a component is created

6. state can `only` be updated using the function `setState`

we never want to set state object directly except when initialization, always use `setState`

- Section 6

## lifecycle methods

constructor -> render -> componentDidMount -> componentDidUpdate -> componentWillUnmount

1. constructor: good place to do one-time setup

2. render: avoid doing anything besides returning JSX

3. componentDidMount: good place to do data-loading

4. componentDidUpdate: good place to do more data-loading when state/props change

5. componentWillUnmount: good place to do cleanup(especially for non-React stuff)

### other lifecycle methods (rarely used)

- shouldComponentUpdate()

- getDerivedStateFromProps()

- getSnapshotBeforeUpdate()

## Passing state as props

- same syntax

<SeasonDisplat lat={this.state.lat}>

## default props

Component.defaultProps = {
prop1: ,
prop2: ,
};

- Avoiding conditionals in render, in case you need to change JSX for all conditions, there will be a lot of duplicates

## example using state

- display time every seconds

```javascript
class Clock extends React.Component {
	state = { time: new Date().toLocaleTimeString() };

	componentDidMount() {
		setInterval(() => {
			this.setState({ time: new Date().toLocaleTimeString() });
		}, 1000);
	}

	render() {
		return <div className="time">This time is : {this.state.time}</div>;
	}
}
```

## handle user inputs wth Forms and events

### controlled vs uncontrolled elements

- why controlled elements?

user types in input -> callback gets invoked -> we call setState with the new value -> component
rerenders -> input is told what its value is (coming from the state)

- diffs

* uncontrolled elements:
  we don't know the value of input right now, we need to access the input in the dom tree. The source of truth is inside html elements but not within our own react components. we want the react side controls everything

* controlled elements:
  we could look at the state object and always know the value of the input

### Understand `this` in javascript

- hard topic

* How is the value of `this` determined in the function?

```javascript
class Car {
	setDriverSound(sound) {
		this.sound = sound;
	}

	drive() {
		return this.sound;
	} // this here is dynamic, it depends on "where" the function gets called
}

const car = new Car();
car.setDriveSound("vroom");
car.drive(); // here this refers to the the car object which called the drive function

const truck = {
	sound: "putputput",
	driveMyTruck: car.drive,
};

truck.driveMyTruck(); // => the return value will be 'putputput'
// because truck is where the drive() function get called

// corner case

const drive = car.drive;

drive(); // get error: cannot read property 'sound' undefined
```

```javascript
class SearchBar {
	onFormSubmit(e) {
		e.preventDefault();

		console.log(this.state.term);
	}


  render() {
    return <form onSubmit={this.onFormSubmit}>;
  }

}

//console gives you error, access term on undefined object

// here, when the 'onFormSubmit' function gets called, `this` !== the instance of class component
```

- how to solve it?

1. binding function inside the constructor

```javascript
class SearchBar {
	constructor() {
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
}
```

2.  using arrow function instead

```javascript
class SearchBar {
	onFormSubmit = (e) => {
		e.preventDefault();

		console.log(this.state.term);
	};
}

// now 'this' refers to the instance of SearchBar object
```

3. wrap the function in arrow function

And don't forget to pass the event in the wrapped arrow function

```javascript
class SearchBar extends React.Component {
	state = { term: "" };

	onFormSubmit(e) {
		e.preventDefault();

		console.log(this.state.term);
	}

	render() {
		return (
			<div className="ui segment">
				<form
					onSubmit={(event) => this.onFormSubmit(event)}
					className="ui form"
				>
					<div className="field">
						<label>Image Search</label>
						<input
							type="text"
							value={this.state.term}
							onChange={(e) => this.setState({ term: e.target.value })}
						/>
					</div>
				</form>
			</div>
		);
	}
}
```

### pass callback as props
