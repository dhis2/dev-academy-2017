import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import AppContainer from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={configureStore()}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
