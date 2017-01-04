import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import * as types from '../constants/actionTypes'


class TransactionsTable extends Component {
    constructor(props) {
        super(props);
        //this.state = {
        //    transactions: []
        //}
        //props.store.subscribe(() => {
        //    this.setState({
        //        transactions: props.store.getState().transactions
        //    });
        //});
    }

    deleteTransaction(doc) {
        console.log('delete transaction', doc);
        this.props.store.dispatch({type:types.REMOVE, data: doc})
    }

    render() {
        let rows = [];
        if(!this.props.transactions) {
            rows.push(<TableRow key="empty" selectable={false}>
                <TableRowColumn style={{textAlign:"center"}}>No transaction yet
                </TableRowColumn>
            </TableRow>);
        } else {
            for(var i = 0;i < this.props.transactions.length;i++) {
                var t = this.props.transactions[i];
                let date = '';
                if(t.date) {
                    date = t.date.toString()
                }
                rows.push(
                    <TableRow key={t._id} selectable={false}>
                        <TableRowColumn>{date}</TableRowColumn>
                        <TableRowColumn>{t.amount}</TableRowColumn>
                        <TableRowColumn>{t.category}</TableRowColumn>
                        <TableRowColumn>
                            <IconButton tooltip="Delete Transaction" onTouchTap={this.deleteTransaction.bind(this, t)}>
                                <ActionDelete />
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }


        return (

        <Table>
            <TableHeader displaySelectAll={false}>
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


        );
    }
}

export default TransactionsTable;

