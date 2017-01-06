import * as t from '../constants/actionTypes'
import {ignoreActions } from 'redux-ignore';

const defaultMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);


const visibilityFilter = (state = defaultMonth, action) => {

    console.log('VISIBILITY FILTER REDUCER', state, action);
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export default ignoreActions(visibilityFilter, [t.TOGGLE_SIDEBAR, t.ADD_CATEGORY, t.REMOVE_CATEGORY, t.UPDATE_CATEGORY]);
