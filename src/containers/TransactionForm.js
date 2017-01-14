import { connect } from 'react-redux'
import { addTransaction } from '../actions/'
import { ADD_CATEGORY } from '../constants/actionTypes'
import SpentForm from '../components/SpentForm'
import { reset } from 'redux-form'
import md5 from 'md5'
import * as materialColors from 'material-ui/styles/colors'

export const getCategoryColor = (name) => {
    //There are 19 different colors, each with 6 different shades
    const color = parseInt(md5(name).substr(0,1), 16);
    var shade = Math.round(parseInt(md5(name).substr(1,1), 16) / 4);

    const colors = [
        'red',
        'pink',
        'purple',
        'deepPurple',
        'indigo',
        'blue',
        'lightBlue',
        'cyan',
        'teal',
        'lightGreen',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deepOrange',
        'brown',
        'blueGrey'
    ];
    const shades = [
        '100',
        '300',
        '500',
        '700',
        '900'
    ];
    return materialColors[colors[color] + '' + shades[shade]];
}

const getCategories = (categories, filter) => {
    //console.log(transactions);
    const cats = categories.map((c) => {
        return c.name;
    });

    return [...new Set(cats)];
}

const mapStateToProps = (state) => {

    return {
        categories: getCategories(state.categories),
        numberOfTransactions: state.transactions.length
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data) => {
            const color = getCategoryColor(data.category);
            const category = {color: color, name: data.category, type: "category"};
            dispatch( {type:ADD_CATEGORY, data: category});
            const transaction = {
                amount: parseFloat(data.amount),
                date: data.date.toISOString(),
                category: category,
            }

            dispatch(reset('transaction'));
            dispatch(addTransaction(transaction));
        }
    }
}

const TransactionForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpentForm)


export default TransactionForm;
