import React, { Component } from 'react';
import logo from './phdog.jpg';
import './App.css';

import Todo from './Todo.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <h1 className="App-title">Dr. Doggo Todo</h1>

                <Todo />
            </div>
        );
    }
}

export default App;
