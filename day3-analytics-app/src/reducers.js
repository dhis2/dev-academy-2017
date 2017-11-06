import { combineReducers } from 'redux';

const isLoading = (state = false, action) => {
    switch (action.type) {
        case 'SET_IS_LOADING':
            return action.value;
        default:
            return state;
    }
};

const data = (state = null, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.value;
        default:
            return state;
    }
}

export default combineReducers({
    isLoading,
    data
});
