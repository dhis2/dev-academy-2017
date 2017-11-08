import React from 'react';

import TodoList from './TodoList.js';

export default class Todo extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            todos: [],
            currentTodo: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange (event) {
        console.info(event.target.value);
        this.setState({
            currentTodo: event.target.value
        });
    }

    handleClick (event) {
        const todos = this.state.todos.slice();
        todos.push(this.state.currentTodo);
        this.setState({
            todos: todos
        });
    }

    render () {
        return (
            <div>
                <input
                    onChange={this.handleChange}
                    placeholder="add something for dr. doggo" />

                <button onClick={this.handleClick}>Add</button>
                <TodoList todos={this.state.todos} />
            </div>
        );
    }
}
