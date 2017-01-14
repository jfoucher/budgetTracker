import { connect } from 'react-redux'
import { showSnackbar } from '../actions/'
import { SHOW_SNACKBAR } from '../constants/actionTypes'
import UserButtons from '../components/UserButtons'



const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showSnackbar: (data) => {
            dispatch(showSnackbar(data));
        }
    }
}

const UserButtonsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserButtons)


export default UserButtonsContainer;
