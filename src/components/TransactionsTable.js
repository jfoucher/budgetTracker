import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, Snackbar} from 'material-ui';

import * as types from '../constants/actionTypes'
import TransactionLine from './TransactionLine'


class TransactionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMessage: 'Transaction deleted'
        }
    }


    handleUndo = () => {
        this.props.store.dispatch({type:types.RESTORE, data: this.state.deletedTransaction});
        this.setState({
            snackbarOpen: false
        });
    }

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
            <Snackbar
                open={this.state.snackbarOpen}
                message={this.state.snackbarMessage}
                autoHideDuration={6000}
                action="undo"
                onActionTouchTap={this.handleUndo}
                onRequestClose={() => {this.setState({snackbarOpen: !this.state.snackbarOpen})}}
            />
        </div>

        );
    }
}

TransactionsTable.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.object.isRequired,
        amount: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default TransactionsTable;

