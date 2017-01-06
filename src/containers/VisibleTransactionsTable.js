import { connect } from 'react-redux'
import { deleteTransaction } from '../actions/'
import TransactionsTable from '../components/TransactionsTable'

const getVisibleTransactions = (transactions, filter) => {

    //Return transaction that correspond to the month given in the filter

    return transactions.filter((transaction) => {
        const date = new Date(transaction.date);
        const str = date.getFullYear() + '-' + (date.getMonth() + 1);
        return str == filter
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
            console.log('dispatching delete transaction action for transaction:', transaction)
            dispatch(deleteTransaction(transaction))
        }
    }
}

const VisibleTransactionsTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsTable)

export default VisibleTransactionsTable