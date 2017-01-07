import { connect } from 'react-redux'
import MonthChart from '../components/MonthChart'

const getData = (transactions, filter) => {
    //Return transaction that correspond to the month given in the filter
    const thisMonth = transactions.filter((transaction) => {
        const date = new Date(transaction.date);
        const str = date.getFullYear() + '' + (date.getMonth() + 1);
        return str === filter
    });
    const year = Number(filter.substr(0,4));
    const month = Number(filter.substring(4)) - 1;

    var date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(1);
    var data = [];
    while(date.getMonth() === month) {
        const dayTransactions = thisMonth.filter((transaction) => {
            const d = new Date(transaction.date);
            return date.getDate() === d.getDate()
        });
        //console.log('transactions for', date, dayTransactions);
        var cat = {};
        dayTransactions.forEach((tr) => {
            if(typeof cat[tr.category.name] === 'undefined') {
                cat[tr.category.name] = parseFloat(tr.amount);
            } else {
                cat[tr.category.name] += parseFloat(tr.amount);
            }
        });

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
        const date = new Date(transaction.date);
        const str = date.getFullYear() + '' + (date.getMonth() + 1);
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
        month: state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const MonthChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthChart)

export default MonthChartContainer