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
            cats[t.category.name] = {amount: t.amount, color: t.category.color};
        } else {
            cats[t.category.name].amount += t.amount;
        }
        thisMonth.splice(i, 1);
    }

    var data = [];

    for(var c in cats) {
        if(cats.hasOwnProperty(c)) {
            data.push({name: c, value: cats[c].amount, color: cats[c].color});
        }
    }

    return data;
    //Save them by day and stack to return data


}


const mapStateToProps = (state, ownProps, a, b, c) => {
    return {
        data: getData(state.transactions, state.visibilityFilter),
        month: state.visibilityFilter,
        sample: !Boolean(state.transactions.length)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const CategoryPieChartContainer = connect(
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
)(CategoryPieChart);

export default CategoryPieChartContainer