import { connect } from 'react-redux'
import { addTransaction } from '../actions/'
import { ADD_CATEGORY } from '../constants/actionTypes'
import SpentForm from '../components/SpentForm'
import { reset } from 'redux-form'


const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data) => {
            const transaction = {
                amount: data.amount,
                date: data.date.toISOString(),
                category: data.category,
            }
            dispatch( {type:ADD_CATEGORY, data: {name: transaction.category, type: "category"}});
            dispatch(reset('transaction'));
            dispatch(addTransaction(transaction));
        }
    }
}

const TransactionForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpentForm)

export default TransactionForm