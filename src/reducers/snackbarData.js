import {SHOW_SNACKBAR} from '../constants/actionTypes'
import {filterActions } from 'redux-ignore';


const snackbarData = (state = {open: false, message: ''}, action) => {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return {
                open: action.open,
                message: action.message,
                onActionTouchTap: action.onActionTouchTap,
                actionLabel: action.actionLabel
            };
        default:
            return state
    }
}

export default filterActions(snackbarData, [SHOW_SNACKBAR]);