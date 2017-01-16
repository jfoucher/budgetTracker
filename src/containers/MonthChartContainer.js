import { connect } from 'react-redux'
import MonthChart from '../components/MonthChart'
import moment from 'moment'

const getYearData = (transactions, filter) => {

    //Return transaction that correspond to the month or year given in the filter

    const thisYear = transactions.filter((transaction) => {
        const str = moment(transaction.date).format('YYYY');
        return str === filter;
    });

    const year = Number(filter);

    var date = new Date();
    date.setFullYear(year);
    date.setMonth(0);
    date.setDate(1);
    var data = [];

    const filterCallback = (transaction) => {
        const d = new Date(transaction.date);
        return date.getMonth() === d.getMonth()
    };

    const forEachCallback = (tr) => {
        if(typeof cat[tr.category.name] === 'undefined') {
            cat[tr.category.name] = parseFloat(tr.amount);
        } else {
            cat[tr.category.name] += parseFloat(tr.amount);
        }
    };

    while(date.getFullYear() === year) {
        const dayTransactions = thisYear.filter(filterCallback);
        //console.log('transactions for', date, dayTransactions);
        var cat = {};
        dayTransactions.forEach(forEachCallback);

        cat.name = moment(date).format('MMM');
        data.push(cat);
        date.setMonth(date.getMonth() + 1);
    }
    return data;
};


const getData = (transactions, filter) => {
    console.log('filter', filter, filter.length);
    if(filter.length === 4) { //If we want to get data for the whole year
        //Get monthly data for the whole year
        console.log('getting data for the whole year')
        return getYearData(transactions, filter)
    }

    //Return transaction that correspond to the month or year given in the filter

    const thisMonth = transactions.filter((transaction) => {
        const str = moment(transaction.date).format('YYYYMM');
        return str === filter;
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
    let format = 'YYYYMM';
    if(filter.length === 4) { //If we want to get data for the whole year
        //Get monthly data for the whole year
        format = 'YYYY';
    }

    return transactions.filter((transaction) => {
        const date = moment(transaction.date);
        const str = date.format(format);
        return str === filter
    }).map((t) => {
        return t.category;
    }).filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['name']).indexOf(obj['name']) === pos;
    });
}

const mapStateToProps = (state) => {
    console.log('state.visibilityFilter', state.visibilityFilter);
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
            return prev.transactions === next.transactions && prev.visibilityFilter === next.visibilityFilter;
        }
    }
)(MonthChart)



export default MonthChartContainer