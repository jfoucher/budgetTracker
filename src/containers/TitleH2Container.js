import { connect } from 'react-redux'
import TitleH2 from '../components/TitleH2'
import moment from 'moment'



const mapStateToProps = (state) => {
    const date = moment(state.visibilityFilter, 'YYYYM');
    let format = 'YYYYMM';
    if(state.visibilityFilter.length === 4) {
        format = 'YYYY';
    }

    const thisMonth =  state.transactions.filter((transaction) => {
        const str = moment(transaction.date).format(format);
        return str === state.visibilityFilter
    });

    const total = thisMonth.reduce((t, tr) => {
        return t + parseFloat(tr.amount);
    }, 0);
    let outputFormat = 'MMMM YYYY';
    if(state.visibilityFilter.length === 4) {
        outputFormat = 'YYYY';
    }
    return {
        month: date.format(outputFormat),
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
