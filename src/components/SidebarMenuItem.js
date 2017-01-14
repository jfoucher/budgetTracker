import React, { PropTypes } from 'react'
import {Divider, ListItem, Subheader} from 'material-ui';
import moment from 'moment'
import ActionInfo from 'material-ui/svg-icons/action/info';

const SidebarMenuItem = ({ month, onClick, clickClose, numberOfTransactions }) => {
    const date = moment(month, "YYYYMM");

    return (
        <ListItem onTouchTap={onClick} primaryText={date.format('MMM YYYY')} secondaryText={<div style={{fontWeight: 300}}>{numberOfTransactions + " transaction"+(numberOfTransactions>1 ? 's' : '')}</div>} />
    )
}

SidebarMenuItem.propTypes = {
    month: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default SidebarMenuItem

//this.changeMonth.bind(this, month)

