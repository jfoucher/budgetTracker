import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import SidebarMenuItem from '../components/SidebarMenuItem'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
            ownProps.clickClose();
        }
    }
}

const FilterSidebarMenuItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarMenuItem)

export default FilterSidebarMenuItem