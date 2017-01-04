import React, { Component } from 'react';
import './SpentForm.css';
import {RaisedButton, Paper, Divider, FlatButton, Dialog, FloatingActionButton} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {
    TextField,
    DatePicker,
    AutoComplete,
} from 'redux-form-material-ui'
import {ContentAdd} from 'material-ui/svg-icons';


class MySpentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            open: false,

        };

        props.store.subscribe(() => {
            this.setState({
                categories: props.store.getState().categories.map((c) => {return c.name})
            });
        });
    }
    handleClose = () => {
        console.log('togggle open/close')
        this.setState({open:!this.state.open});
    }
    sendSubmit = () => {
        console.log('props', this.props)
        this.props.submit();
        this.setState({open:!this.state.open});
    }
    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.sendSubmit}
                />,
        ];

        const { handleSubmit } = this.props;
        const style= {
            position: "fixed",
            bottom: "40px",
            right: "40px",
        }
        return (
        <div>
            <Dialog title="Add a transaction"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="amount"
                        component={TextField}
                        underlineShow={false}
                        hintText="Transaction Amount"
                        floatingLabelText="Transaction Amount"

                        />

                    <Divider />
                    <Field
                        name="date"
                           component={DatePicker}
                           underlineShow={false}
                           hintText="Transaction Date"
                        value={new Date()}
                        floatingLabelText="Transaction Date"
                        />

                    <Divider />
                    <Field
                        name="category"
                        component={AutoComplete}
                        underlineShow={false}
                        hintText="Category"
                        floatingLabelText="Category"
                        dataSource={this.state.categories}
                        />
                    <Divider />

                </form>

            </Dialog>
            <FloatingActionButton style={style} secondary={true} onTouchTap={this.handleClose} >
                <ContentAdd/>
            </FloatingActionButton>

        </div>
        );
    }
}
const SpentForm = reduxForm({
    form: 'transaction'
})(MySpentForm);

export default SpentForm