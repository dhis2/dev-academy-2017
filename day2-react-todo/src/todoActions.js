
// This is an Redux action we use to tell Redux that we wish to
// change the state.


export const addTodo = function addTodo (text) {
	// This will trigger the `todoReducer` with the corresponding `type`.
    return {
        type: 'ADD_TODO',
        text: text
    }
}
