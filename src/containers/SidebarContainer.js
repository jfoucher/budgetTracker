import { connect } from 'react-redux'
import SideBar from '../components/SideBar'
import moment from 'moment'
import { setVisibilityFilter } from '../actions'

const getAvailableMonths = (transactions) => {
    //Return transaction that correspond to the month given in the filter
    const dates = transactions.map((transaction) => {
        const date = moment(transaction.date);

        return date.format('YYYYMM');
    }).filter((t) => {
        return !t._deleted;
    });
    const months = [...new Set(dates)].sort((a, b) => {
        return parseInt(b, 10) - parseInt(a, 10);
    });
    var years = [], previousYear;
    for(var i = 0; i < months.length; i++) {
        var y = months[i].substr(0,4);
        if(typeof previousYear === 'undefined') {
            years[0] = [];
            years[0].push(months[i])
        } else if(y === previousYear) {
            years[years.length-1].push(months[i]);
        } else if (y !== previousYear) {
            years[years.length] = [];
            years[years.length-1].push(months[i]);
        }

        previousYear = y
    }

    return years;
}

const getNumberOfTransactionsByMonth = (transactions) => {
    var transactionsPerMonth = {};
    for(var i = 0; i < transactions.length;i++) {
        const date = moment(transactions[i].date);
        const d = date.format('YYYYMM');
        if(typeof transactionsPerMonth[d] === "undefined") {
            transactionsPerMonth[d] = 1;
        } else {
            transactionsPerMonth[d] += 1;
        }

    }
    return transactionsPerMonth;
}

const mapStateToProps = (state) => {

    return {
        months: getAvailableMonths(state.transactions),
        transactionsPerMonth: getNumberOfTransactionsByMonth(state.transactions)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        displayYear: (year, event) => {
            console.log('displayYear', year, event);
            dispatch(setVisibilityFilter(year));
            ownProps.onClickClose();
        }
    }
}

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)

export default SidebarContainer