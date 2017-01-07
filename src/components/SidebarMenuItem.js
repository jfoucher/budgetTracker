import React, { PropTypes } from 'react'
import {MenuItem, Divider} from 'material-ui';
import moment from 'moment'
import {ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

const SidebarMenuItem = ({ month, onClick, clickClose, numberOfTransactions }) => {
    const date = moment(month, "YYYY-M");
    return (
    <ListItem onTouchTap={onClick} primaryText={date.format('MMM YYYY')} secondaryText={numberOfTransactions + " transaction"+(numberOfTransactions>1 ? 's' : '')} />
    )
}

SidebarMenuItem.propTypes = {
    month: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default SidebarMenuItem

//this.changeMonth.bind(this, month)

