import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoReducer from './todoReducers';

/*
 * This is the preloaded state we give redux
 */
const preloadedState = {
	todos: []
};

const store = createStore(todoReducer, preloadedState);

/*
 * We wrap our `App` in a `Provider` which is a `Component`
 * we use as a parent for our app. We do this so we can push the
 * state out of our `App` into Redux.
 * 
 * Redux will then handle updating the `props` of our `App` when the
 * state changes, i.e. when we add a new Todo.
 */

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
