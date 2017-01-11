import React, { Component } from 'react';
import { Divider, FlatButton, Dialog, FloatingActionButton} from 'material-ui';
import {getScreenClass} from '../utils'
import FontIcon from 'material-ui/FontIcon';
import { Field, reduxForm } from 'redux-form';
import {
    TextField,
    DatePicker,
    AutoComplete,
} from 'redux-form-material-ui'
//import {ContentAdd} from 'material-ui/svg-icons';


const validate = values => {
    const errors = {};

    if (!values.date) {
        errors.date = 'Required'
    } else if (!values.date instanceof Date) {
        errors.date = 'Invalid Date'
    }
    if (!values.amount) {
        errors.amount = 'Required'
    } else if (isNaN(Number(values.amount))) {
        errors.amount = 'Must be a number'
    }
    if (!values.category) {
        errors.category = 'Required'
    }
    return errors
}


class MySpentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            open: false,

        };

        //props.store.subscribe(() => {
        //    this.setState({
        //        categories: props.store.getState().categories.map((c) => {return c.name})
        //    });
        //});
    }
    handleClose = () => {
        this.setState({open:!this.state.open});
    }
    sendSubmit = () => {
        this.props.submit();
        if(this.props.valid) {
            this.setState({open:!this.state.open});
        }

    }
    render() {

        var css = {};
        if(getScreenClass(true, true) === "xs") {
            css = {
                maxWidth:"none",
                width: "100%",
                maxHeight: "none",
                height: "100%",
                overflow: "scroll"
            }
        }

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
                onRequestClose={this.handleClose}
                contentStyle={css}
                autoScrollBodyContent={true}
                >
                <form>
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
                        autoOk={true}
                        style={{maxWidth:'100%', transform:'none'}}
                        dialogContainerStyle={{maxWidth:'100%', transform:'translate(0px, -35px)'}}
                        />

                    <Divider />
                    <Field
                        name="category"
                        component={AutoComplete}
                        underlineShow={false}
                        hintText="Category"
                        floatingLabelText="Category"
                        dataSource={this.props.categories}
                        filter={(searchText, key) => {return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;}}
                        />

                </form>

            </Dialog>
            <FloatingActionButton style={style} secondary={true} onTouchTap={this.handleClose} >
                <FontIcon className="material-icons" style={{color:"white"}}>add</FontIcon>
            </FloatingActionButton>

        </div>
        );
    }
}
const SpentForm = reduxForm({
    form: 'transaction',
    validate
})(MySpentForm);

export default SpentForm