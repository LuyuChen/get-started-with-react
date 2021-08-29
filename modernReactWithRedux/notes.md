# React


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

* ES2015 Modules: import

* ComonJS Modules: require

## React component

A component is a function or a class that  produces HTML to show the user and handles feedback from the user.

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



* Section 3

faker.js - generate massive amounts of fake data in the browser and node.js

## Component nesting

 