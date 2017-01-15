import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, Snackbar} from 'material-ui';

import * as types from '../constants/actionTypes'
import TransactionLine from './TransactionLine'


class TransactionsTable extends Component {

    render() {
        const {transactions, onDeleteClick} = this.props;
        let rows = [];
        if(transactions.length === 0) {
            rows.push(
            <TableRow key="empty" selectable={false}>
                <TableRowColumn style={{textAlign:"center"}}>No transaction yet
                </TableRowColumn>
            </TableRow>)
            ;
        } else {
            rows = transactions.map((transaction) => {
                return(
                    <TransactionLine key={transaction._id} transaction={transaction} onDeleteClick={onDeleteClick} />
                )
            });
        }

        //TODO add footer with totals

        return (
        <div>
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                        <TableHeaderColumn>Category</TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {rows}
                </TableBody>
            </Table>
        </div>

        );
    }
}

TransactionsTable.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired,
        amount: PropTypes.number.isRequired
    }).isRequired).isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default TransactionsTable;

