import { connect } from 'react-redux'
import { toggleSidebar } from '../actions/'
import TitleBar from '../components/TitleBar'

const getSidebarState = (state) => {
    console.log('getSidebarState',state)
    return state.UIReducer;
}

const mapStateToProps = (state) => {

    return {
        sidebarOpen: getSidebarState(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMenuClick: (open) => {
            dispatch(toggleSidebar(!open));
        }
    }
}

const TitleBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleBar)

export default TitleBarContainer