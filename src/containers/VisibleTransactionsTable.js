import { connect } from 'react-redux'
import { deleteTransaction, showSnackbar } from '../actions/'
import TransactionsTable from '../components/TransactionsTable'
import moment from 'moment'
import {RESTORE} from '../constants/actionTypes'

const getVisibleTransactions = (transactions, filter) => {

    //Return transaction that correspond to the month given in the filter
    let format = 'YYYYMM';
    if(filter.length === 4) {
        format = 'YYYY';
    }
    return transactions.filter((transaction) => {
        const date = moment(transaction.date);
        const str = date.format(format);
        return str === filter && !transaction._deleted
    });


}

const mapStateToProps = (state) => {
    return {
        transactions: getVisibleTransactions(state.transactions, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteClick: (transaction) => {
            dispatch(deleteTransaction(transaction))
            dispatch(showSnackbar({
                open:true,
                message: 'Transaction deleted',
                actionLabel: 'Undo',
                onActionTouchTap: () => {
                    console.log('clicked undo', transaction);
                    dispatch({type: RESTORE, data: transaction});
                    dispatch(showSnackbar({open: false, message:''}));
                }
            }))
        }
    }
}

const VisibleTransactionsTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsTable)

export default VisibleTransactionsTable