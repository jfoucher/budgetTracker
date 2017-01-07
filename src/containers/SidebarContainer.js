import { connect } from 'react-redux'
import SideBar from '../components/SideBar'

const getAvailableMonths = (transactions) => {
    //Return transaction that correspond to the month given in the filter
    const dates = transactions.map((transaction) => {
        const date = new Date(transaction.date);
        return date.getFullYear() + '' + (date.getMonth() + 1);
    });
    return [...new Set(dates)].sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
}

const getNumberOfTransactionsByMonth = (transactions) => {
    var transactionsPerMonth = {};
    for(var i = 0; i < transactions.length;i++) {
        const date = new Date(transactions[i].date);
        const d = date.getFullYear() + '' + (date.getMonth() + 1);
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

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)

export default SidebarContainer