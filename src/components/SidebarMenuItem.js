import React, { PropTypes } from 'react'
import {MenuItem, Divider} from 'material-ui';
const SidebarMenuItem = ({ month, onClick }) => {

    return (
        <div key={month}><MenuItem

            onTouchTap={onClick}>{month}

        </MenuItem><Divider /></div>
    )
}

SidebarMenuItem.propTypes = {
    month: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default SidebarMenuItem

//this.changeMonth.bind(this, month)

