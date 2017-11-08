import React from 'react';

import TodoList from './TodoList.js';

import { connect } from 'react-redux';
import * as todoActions from './todoActions.js';

import { bindActionCreators } from 'redux';

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(todoActions, dispatch)
	}
}

function mapStateToProps(state, props) {
	console.log('mapping state to props', state, props);
	return {
		todos: state.todos
	}
}

class Todo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			currentTodo: '',
			todos: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange (event) {
		this.setState({
			currentTodo: event.target.value
		});
	}

	handleClick (event) {
		console.log('handleClick', this.state.currentTodo);
		this.props.actions.addTodo(this.state.currentTodo);
	}

	render () {
		return (
			<div>
			<input
			onChange={this.handleChange}
			placeholder="add something for dr. doggo" />

			<button onClick={this.handleClick}>Add</button>

			<TodoList todos={this.props.todos} />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
