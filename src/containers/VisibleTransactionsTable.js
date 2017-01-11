import { connect } from 'react-redux'
import { deleteTransaction } from '../actions/'
import TransactionsTable from '../components/TransactionsTable'
import moment from 'moment'

const getVisibleTransactions = (transactions, filter) => {

    //Return transaction that correspond to the month given in the filter

    return transactions.filter((transaction) => {
        const date = moment(transaction.date);
        const str = date.format('YYYYMM');
        return str === filter
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
        },
        onUndoClick: (transaction) => {
            //console.log('transaction undo delete', transaction)
        }
    }
}

const VisibleTransactionsTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsTable)

export default VisibleTransactionsTable