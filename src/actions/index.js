import * as t from '../constants/actionTypes'

export const addTransaction = transaction => ({
    type: t.ADD,
    data: transaction
})

export const deleteTransaction = transaction => ({
    type: t.REMOVE,
    data: transaction
})

export const toggleSidebar = el => ({
    type: t.TOGGLE_SIDEBAR,
    data: el
})

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}
export const showSnackbar = (data) => {
    console.log('showSnackbar action', data);
    return {
        type: t.SHOW_SNACKBAR,
        ...data
    }
}