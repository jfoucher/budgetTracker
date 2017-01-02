import * as t from './actionTypes'

const addTransactionUnsafe = transaction => ({
    type: t.ADD,
    transaction: transaction
})


export const addTransaction = transactionId => (dispatch, getState) => {
    console.log('tid', transactionId);
    dispatch(addTransactionUnsafe(transactionId));
}
