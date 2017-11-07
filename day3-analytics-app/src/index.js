import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import AppContainer from './App';
import registerServiceWorker from './registerServiceWorker';

import { init } from 'd2/lib/d2';

init({
    baseUrl: 'http://localhost:8080/api',
    schemas: [],
    headers: { Authorization: `Basic ${btoa('admin:district')}` }
})
.then((d2) => {
    ReactDOM.render(
        <Provider store={configureStore()}>
            <AppContainer />
        </Provider>,
        document.getElementById('root')
    );
})
.catch((error) => {
    console.warn('Failed to initialize d2', error);
});

registerServiceWorker();
