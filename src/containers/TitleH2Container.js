import { connect } from 'react-redux'
import TitleH2 from '../components/TitleH2'
import moment from 'moment'



const mapStateToProps = (state) => {
    const date = moment(state.visibilityFilter, 'YYYYM');
    const thisMonth =  state.transactions.filter((transaction) => {
        const date = moment(transaction.date);
        const str = date.format('YYYYMM');
        return str === state.visibilityFilter
    });

    const total = thisMonth.reduce((t, tr) => {
        return t + parseFloat(tr.amount);
    }, 0);
    return {
        month: date.format('MMMM YYYY'),
        numTransactions: thisMonth.length,
        total: total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const TitleH2Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleH2)


export default TitleH2Container;
