import { fetchData } from './api';

// action creators

const setIsLoading = isLoading => ({
    type: 'SET_IS_LOADING',
    value: isLoading
});

const setData = data => ({
    type: 'SET_DATA',
    value: data
});

// thunk creators

export const getData = periodId => (dispatch, getState) => {
    dispatch(setIsLoading(true));

    return fetchData(periodId).then(data => {
        dispatch(setData(data));

        dispatch(setIsLoading(false));
    });
};
