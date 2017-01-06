
const defaultMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)

const visibilityFilter = (state = defaultMonth, action) => {

    console.log('VISIBILITY FILTER REDUCER', state, action);
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export default visibilityFilter