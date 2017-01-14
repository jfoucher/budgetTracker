import React, { Component } from 'react';
import { Divider, FlatButton, Dialog, FloatingActionButton, Popover} from 'material-ui';
import {getScreenClass} from '../utils'
import { Field, reduxForm } from 'redux-form';
import {
    TextField,
    DatePicker,
    AutoComplete,
} from 'redux-form-material-ui'
import { grey700, orange700 } from 'material-ui/styles/colors';


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
            hintOpen: false
        };



        //props.store.subscribe(() => {
        //    this.setState({
        //        categories: props.store.getState().categories.map((c) => {return c.name})
        //    });
        //});
    }
    handleClose = () => {
        this.setState({open:!this.state.open, hintOpen: !this.state.hintOpen});
    }
    sendSubmit = () => {
        this.props.submit();
        if(this.props.valid) {
            this.setState({open:!this.state.open});
        }

    }

    componentDidMount() {
        console.log('componentDidReceiveProps', this.props);

        if(!this.props.numberOfTransactions) {
            console.log('openning hint', this.props.numberOfTransactions);
            this.setState({hintOpen: true});
        }
    }

    render() {

        console.log('form props', this.props);
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
                        onChange={() => {}}
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
            <FloatingActionButton id="addTransactionButton" style={style} secondary={true} onTouchTap={this.handleClose} >
                <div style={{padding:"9px"}}>
                    <img src="icons/add.png" width="30" height="30" />
                </div>
            </FloatingActionButton>
            <Popover
                open={this.state.hintOpen}
                style={{padding:"0.3em 0.5em 0.1em 0.5em", transform: "translate(15px, -10px)", color: grey700, fontWeight: 200}}
                anchorEl={document.getElementById("addTransactionButton")}
                useLayerForClickAway={false}
                anchorOrigin={{ vertical: 'top', horizontal: 'middle'}}
                targetOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                zDepth={2}
                >
                Click here to create your first transaction
                <div style={{fontSize: "1.3em", marginTop:"0.3em", color:orange700, transform: "scaleY(0.7)", textAlign: "right"}}>▼</div>
            </Popover>

        </div>
        );
    }
}
const SpentForm = reduxForm({
    form: 'transaction',
    validate
})(MySpentForm);

export default SpentForm