import { connect } from 'react-redux'
import { toggleSidebar } from '../actions/'
import SideBar from '../components/SideBar'

const getAvailableMonths = (transactions) => {

    //Return transaction that correspond to the month given in the filter

    const dates = transactions.map((transaction) => {
        const date = new Date(transaction.date);
        return date.getFullYear() + '-' + (date.getMonth() + 1);
    });
     const months = [...new Set(dates)];
    console.log('GOT MONTHS FOR SIDEBAR', months);
    return months;

}

const getSidebarState = (state) => {
    console.log('getSidebarState',state)
    return state.UIReducer;
}

const mapStateToProps = (state) => {

    return {
        months: getAvailableMonths(state.transactions),
        open: getSidebarState(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickClose: (open) => {
            console.log('closing sidebar');
            dispatch(toggleSidebar(!open));
        }
    }
}

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)

export default SidebarContainer