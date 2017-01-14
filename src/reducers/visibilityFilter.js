import * as t from '../constants/actionTypes'
import {filterActions } from 'redux-ignore';
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

export default filterActions(visibilityFilter, ['SET_VISIBILITY_FILTER']);
