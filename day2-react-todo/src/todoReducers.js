const todos = function (state, action) {
	switch (action.type) {
		case 'ADD_TODO':
			console.info('Reducer, ADD_TODO', action.text);
			return {
				todos: [
					...state.todos,
					action.text
				]
			};

		default: 
			console.log('boom', state)
			return state;
	}
}

export default todos;
