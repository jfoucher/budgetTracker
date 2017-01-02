import React, { Component } from 'react';
import './SpentForm.css';
import {RaisedButton, Paper, Divider} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {
    TextField,
    DatePicker,
    AutoComplete,
} from 'redux-form-material-ui'

class MySpentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        props.store.subscribe(() => {
            console.log('form store state', this.props.store.getState());
            this.setState({
                categories: props.store.getState().categories.map((c) => {return c.name})
            });
            console.log('categories', this.state.categories);
        });
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <Paper zDepth={2}>
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
                    <RaisedButton type="submit" label="Save"/>

                </form>
            </Paper>
        );
    }
}
const SpentForm = reduxForm({
    form: 'transaction'
})(MySpentForm);

export default SpentForm