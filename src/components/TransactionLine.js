import React, { PropTypes } from 'react'
import {TableRow, TableRowColumn} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';


const TransactionLine = ({ onDeleteClick, transaction }) => (
    <TableRow key={transaction._id} selectable={false}>
        <TableRowColumn>{transaction.date}</TableRowColumn>
        <TableRowColumn>{transaction.amount}</TableRowColumn>
        <TableRowColumn>{transaction.category.name}</TableRowColumn>
        <TableRowColumn>
            <IconButton tooltip="Delete Transaction" onTouchTap={onDeleteClick.bind(null, transaction)}>
                <ActionDelete />
            </IconButton>
        </TableRowColumn>
    </TableRow>
)

TransactionLine.propTypes = {
    onDeleteClick: PropTypes.func.isRequired,
    transaction: PropTypes.object.isRequired,

}

export default TransactionLine