import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class TransactionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        };

        props.store.subscribe(() => {
            this.setState({
                transactions: props.store.getState().transactions
            });
        });
    }

    render() {
        let rows = [];
        for(var i = 0;i < this.state.transactions.length;i++) {
            var t = this.state.transactions[i];
            let date = '';
            if(t.date) {
                date = t.date.toString()
            }
            rows.push(
                <TableRow key={t._id} selectable={false}>
                    <TableRowColumn>{date}</TableRowColumn>
                    <TableRowColumn>{t.amount}</TableRowColumn>
                    <TableRowColumn>{t.category}</TableRowColumn>
                </TableRow>
            )
        }
        return (

        <Table>
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Date</TableHeaderColumn>
                    <TableHeaderColumn>Amount</TableHeaderColumn>
                    <TableHeaderColumn>Category</TableHeaderColumn>
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

