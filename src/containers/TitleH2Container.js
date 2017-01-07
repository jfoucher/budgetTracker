import { connect } from 'react-redux'
import TitleH2 from '../components/TitleH2'
import moment from 'moment'


const mapStateToProps = (state) => {
    const date = moment(state.visibilityFilter, 'YYYY-M');

    return {
        month: date.format('MMMM YYYY')
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
