import { connect } from 'react-redux'
import MonthChart from '../components/MonthChart'
import moment from 'moment'

const getData = (transactions, filter) => {
    //Return transaction that correspond to the month given in the filter
    const thisMonth = transactions.filter((transaction) => {
        const date = moment(transaction.date);
        const str = date.format('YYYYMM');
        return str === filter
    });



    const year = Number(filter.substr(0,4));
    const month = Number(filter.substring(4)) - 1;

    var date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(1);
    var data = [];

    const filterCallback = (transaction) => {
        const d = new Date(transaction.date);
        return date.getDate() === d.getDate()
    };

    const forEachCallback = (tr) => {
        if(typeof cat[tr.category.name] === 'undefined') {
            cat[tr.category.name] = parseFloat(tr.amount);
        } else {
            cat[tr.category.name] += parseFloat(tr.amount);
        }
    }

    while(date.getMonth() === month) {
        const dayTransactions = thisMonth.filter(filterCallback);
        //console.log('transactions for', date, dayTransactions);
        var cat = {};
        dayTransactions.forEach(forEachCallback);

        cat.name = date.toLocaleDateString();
        data.push(cat);
        date.setDate(date.getDate() + 1);
    }
    return data;
    //Save them by day and stack to return data


}

const getCategories = (transactions, filter) => {
    //console.log(transactions);
    return transactions.filter((transaction) => {
        const date = moment(transaction.date);
        const str = date.format('YYYYMM');
        return str === filter
    }).map((t) => {
        return t.category;
    }).filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['name']).indexOf(obj['name']) === pos;
    });
}

const mapStateToProps = (state, b, c) => {
    return {
        data: getData(state.transactions, state.visibilityFilter),
        categories: getCategories(state.transactions, state.visibilityFilter),
        month: state.visibilityFilter,
        sample: !Boolean(state.transactions.length)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


const MonthChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    (stateProps, dispatchProps, ownProps) => {
        return Object.assign({}, ownProps, stateProps, dispatchProps)
    },
    {
        pure: true,
        areStatesEqual: (prev, next) => {
            return prev.transactions === next.transactions;
        }
    }
)(MonthChart)



export default MonthChartContainer