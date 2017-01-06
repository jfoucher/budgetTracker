import { connect } from 'react-redux'
import { toggleSidebar } from '../actions/'
import SideBar from '../components/SideBar'

const getAvailableMonths = (transactions) => {
    //Return transaction that correspond to the month given in the filter
    console.log('SIDEBAR CONTAINER get available months');
    const dates = transactions.map((transaction) => {
        const date = new Date(transaction.date);
        return date.getFullYear() + '-' + (date.getMonth() + 1);
    });
    return [...new Set(dates)];
}


const mapStateToProps = (state) => {

    return {
        months: getAvailableMonths(state.transactions),
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