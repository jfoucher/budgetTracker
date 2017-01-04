import React, { Component } from 'react';
import {RaisedButton, Paper, Divider, FlatButton, Dialog, FloatingActionButton, Snackbar} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {
    TextField,
    DatePicker,
    AutoComplete,
} from 'redux-form-material-ui'

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
        this.setState({open:!this.state.open});

        var signup = this.props.handleSubmit();
        signup.then((u) => {
            this.setState({
                snackbarMessage: 'Welcome',
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
        })
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Register"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.sendSubmit}
                />,
        ];
        const  { handleSubmit } = this.props
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
    form: 'signup'
})(SignupForm);

export default Signup;