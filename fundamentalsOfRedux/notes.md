# Fundamentals of Redux Course from Dan Abramov

# Principles of Redux

1. First principle: everything that changes in the appliocation, including data and UI states, is contained in a single object ,i.e., the state or the state tree

2. Second principle: the state is read only. The only way to change the state tree is by dispatching an action

- why this way?

```
Making actions the mode of interacting with the state makes development declarative. You don't have to explicitly say 'make an array, sort it, then do this' - you just say 'CREATE_ORDERS' or something intuitive like that. It makes the development process so much easier - future developers need not know how the state change is being implemented as long as the actions work. Plus, you minimize the chances of fucking up your state when you allow only reducers to manipulate it.
```

- pure vs impure function

* pure function: predictable && do not modify the input. same input, same output everytime

* impure function: same input, could be different output

Functions written in Redux have to be pure

## Reducer

reducer(old_state, action) ==> new_state

NOte: old_state will not be changed

3. Third principle: to describe state mutations, you have to write functions that takes the previous state of the app, the action being dispatched, and return the next state

## Redux: store methods

```javascript
const counter = (state = 0, action) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "  DECREMENT":
			return state - 1;
		default:
			return state;
	}
};

const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
	document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener("click", () => {
	store.dispatch({ type: "INCREMENT" });
});
```

## Implement store from scratch

```javascript
const createStore = (reducer) => {
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listenres.filter((l) => l != listener);
		};
	};

	dispatch({});

	return { getState, dispatch, subscribe };
};
```

## avoiding array mutations with concat(), slice(), and ...spread

Use concat(). slice(), ...spread to avoud mutating the input object

```javascript
const addCounter = (list) => {
	return [...list, 0];
};

const removeCounter = (list, index) => {
	return [...list.slice(0, index), ...list.slice(index + 1)];
};

const incrementCounter = (list, index) => {
	return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};

const testAddCounter = () => {
	const listBefore = [];
	const listAfter = [0];

	deepFreeze(listBefore);

	expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 20];

	deepFreeze(listBefore);

	expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

const testIncrementCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 11, 20];

	deepFreeze(listBefore);

	expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();

console.log("All tests passed.") || displayInPreview("All tests passed.");

// display in plunker preview
function displayInPreview(string) {
	var newDiv = document.createElement("div");
	var newContent = document.createTextNode(string);
	newDiv.appendChild(newContent);
	document.body.appendChild(newDiv);
}

// Function exported from deep-freeze lib
function deepFreeze(o) {
	if (o === Object(o)) {
		Object.isFrozen(o) || Object.freeze(o);
		Object.getOwnPropertyNames(o).forEach(function (prop) {
			prop === "constructor" || deepFreeze(o[prop]);
		});
	}
	return o;
}
```

## Avoiding objects mutations with Object.assign() and ...spread
