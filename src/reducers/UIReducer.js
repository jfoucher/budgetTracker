import * as t from '../constants/actionTypes'

const UIReducer = (state = false, action) => {

    console.log('UIReducer', state, action);
    switch (action.type) {
        case t.TOGGLE_SIDEBAR:
            return action.data;
        default:
            return state;
    }
}

export default UIReducer