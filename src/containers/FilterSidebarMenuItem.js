import { connect } from 'react-redux'
import { setVisibilityFilter, toggleSidebar } from '../actions'
import SidebarMenuItem from '../components/SidebarMenuItem'

const mapStateToProps = (state, ownProps) => {

    console.log('menu item mapStateToProps', state, ownProps);

    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('menu item mapDispatchToProps', dispatch, ownProps);
    return {
        onClick: () => {
            console.log('menu item clicked', dispatch, ownProps);
            dispatch(setVisibilityFilter(ownProps.filter));
            dispatch(toggleSidebar(false));
        }
    }
}

const FilterSidebarMenuItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarMenuItem)

export default FilterSidebarMenuItem