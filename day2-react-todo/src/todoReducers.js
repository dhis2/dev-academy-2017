// Here we capture the Action which we sent and do the correct action.
const todos = function (state, action) {
	switch (action.type) {
		case 'ADD_TODO':
			console.info('Reducer - Add TODO to Redux state', action.text);

			// This is how we tell redux how to update the state
			return {
				todos: [
					...state.todos,
					action.text
				]
			};

		default: 
			console.log('Reducer - Use preloaded Redux state', state)
			return state;
	}
}

export default todos;
