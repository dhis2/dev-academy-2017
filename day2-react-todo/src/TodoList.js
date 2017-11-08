
import React from 'react';

export default class TodoList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            todos: []
        }
    }

    li (todo, index) {
        return (
            <li key={index}>{todo}</li>
        );
    }

    render () {
        return (
            <ul>
                {this.props.todos.map(this.li)}
            </ul>
        );
    }
}
