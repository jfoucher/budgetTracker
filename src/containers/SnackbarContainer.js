import { connect } from 'react-redux'
import { showSnackbar } from '../actions/'
import { SHOW_SNACKBAR } from '../constants/actionTypes'
import Snack from '../components/Snack'



const mapStateToProps = (state) => {
    return {
        open: state.snackbarData.open,
        message: state.snackbarData.message,
        onActionTouchTap: state.snackbarData.onActionTouchTap,
        actionLabel: state.snackbarData.actionLabel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => {
            dispatch(showSnackbar({open: false, message:''}));
        }
    }
}

const SnackContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Snack)


export default SnackContainer;
