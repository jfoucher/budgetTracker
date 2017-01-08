import * as t from '../constants/actionTypes'
import {ignoreActions } from 'redux-ignore';
import moment from 'moment'

const defaultMonth = moment().format('YYYYMM');

const visibilityFilter = (state = defaultMonth, action) => {

    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export default ignoreActions(visibilityFilter, [t.TOGGLE_SIDEBAR, t.ADD_CATEGORY, t.REMOVE_CATEGORY, t.UPDATE_CATEGORY]);
