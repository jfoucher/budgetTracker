import React, { Component } from 'react';
import {RaisedButton, Paper, Divider, FlatButton, Dialog, FloatingActionButton, Snackbar} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {
    TextField,
    DatePicker,
    AutoComplete,
} from 'redux-form-material-ui'


const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Should be at least 8 characters long'
    }
    return errors;
}


class SignupForm extends Component {
    static muiName = 'FlatButton';

    constructor(props) {
        super(props);
        this.state={
            open: false,
            snackbarOpen: false,
            snackbarMessage: '',

        }
    }
    handleClose = () => {
        this.setState({open:!this.state.open});
    }

    sendSubmit = () => {

        var signup = this.props.handleSubmit();

        if(!this.props.valid) {
            return;
        }

        signup.then((u) => {

            this.setState({
                snackbarMessage: 'Account successfully created',
                snackbarOpen: true
            });
        }).catch((e) => {
            var msg = 'Could not create your account, sorry. Are you online?';
            if(e.status == 409) {
                msg = 'This account already exists, try logging in';
            }
            this.setState({
            snackbarMessage: msg,
                snackbarOpen: true
            });

        }).then(()=>{
            this.setState({
                open: false
            });
        })
    }

    render() {
        const  { handleSubmit, submitting } = this.props;
        var actions = [
            <FlatButton
                key="button1"
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                />,

        ]
        if(submitting) {
            actions.push(
                <FlatButton
                    key="button2"
                    label="Registering"
                    primary={true}
                    disabled={true}
                    keyboardFocused={true}
                    onTouchTap={this.sendSubmit}
                    />
            )
        } else {
            actions.push(
                <FlatButton
                    key="button2"
                    label="Register"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.sendSubmit}
                    />
            )
        }

        return (
            <div>
                <RaisedButton secondary={true} label="Register" onTouchTap={this.handleClose} />
                <Dialog title="Register to sync and backup your data"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="name"
                            component={TextField}
                            underlineShow={false}
                            hintText="Name"
                            floatingLabelText="Name"

                            />

                        <Divider />
                        <Field
                            name="email"
                            component={TextField}
                            underlineShow={false}
                            hintText="Email"
                            floatingLabelText="Email"
                            type="email"
                            />

                        <Divider />
                        <Field
                            name="password"
                            component={TextField}
                            underlineShow={false}
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            />

                        <Divider />

                    </form>

                </Dialog>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={6000}
                    onRequestClose={() => {this.setState({snackbarOpen: !this.state.snackbarOpen})}}
                    />
            </div>
        );
    }
}
const Signup = reduxForm({
    form: 'signup',
    validate
})(SignupForm);

export default Signup;