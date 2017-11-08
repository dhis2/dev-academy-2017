
export const addTodo = function addTodo (text) {
	console.log('add todo', text);
    return {
        type: 'ADD_TODO',
        text: text
    }
}
