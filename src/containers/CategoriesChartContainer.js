import { connect } from 'react-redux'
import CategoriesChart from '../components/CategoriesChart'

const getData = (transactions, filter) => {
    //Return transaction that correspond to the month given in the filter

    const thisMonth = transactions.filter((transaction) => {
        const date = new Date(transaction.date);
        const str = date.getFullYear() + '-' + (date.getMonth() + 1);
        return str == filter
    });
    var categories = {};
    for(var i=0; i < thisMonth.length;i++) {
        var t = thisMonth[i];
        if(typeof categories[t.category] === 'undefined') {
            categories[t.category] = parseFloat(t.amount);
        } else {
            categories[t.category] += parseFloat(t.amount);
        }
    }

    var data = [];
    for(var key in categories) {
        if (categories.hasOwnProperty(key)){
            data.push({name: key, amount: categories[key]});
        }
    }

    return data;


}

const mapStateToProps = (state, b, c) => {
    return {
        data: getData(state.transactions, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const CategoriesChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesChart)

export default CategoriesChartContainer