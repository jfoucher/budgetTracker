import { connect } from 'react-redux'
import CategoryPieChart from '../components/CategoryPieChart'
import moment from 'moment'

const getData = (transactions, filter) => {
    //Return transaction that correspond to the month given in the filter
    const thisMonth = transactions.filter((transaction) => {
        const date = moment(transaction.date);
        const str = date.format('YYYYMM');
        return str === filter
    });

    var cats = {};

    for (var i = thisMonth.length; i--;) {
        var t = thisMonth[i];
        if(cats[t.category.name] === undefined) {
            cats[t.category.name] = t.amount;
        } else {
            cats[t.category.name] += t.amount;
        }
        thisMonth.splice(i, 1);
    }

    var data = [];

    for(var c in cats) {
        if(cats.hasOwnProperty(c)) {
            data.push({name: c, value: cats[c]});
        }
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

const mapStateToProps = (state) => {
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

const CategoryPieChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryPieChart);

export default CategoryPieChartContainer