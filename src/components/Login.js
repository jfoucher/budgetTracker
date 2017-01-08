import React, { Component } from 'react';
import {RaisedButton, Divider, FlatButton, Dialog, Snackbar} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {getScreenClass} from '../utils'
import {
    TextField
} from 'redux-form-material-ui'

class LoginForm extends Component {
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

        var login = this.props.handleSubmit();
        login.catch((e) => {
            this.setState({
                snackbarMessage: 'Could not log you in, sorry. Check your credentials or sign up',
                snackbarOpen: true
            });
        })
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
                />
        ];
        const  { handleSubmit } = this.props;
        return (
            <div>
                <RaisedButton primary={true} label="Login" onTouchTap={this.handleClose} />
                <Dialog title="Login to sync"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        autoScrollBodyContent={true}
                        contentStyle={css}
                        onRequestClose={this.handleClose}>
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="email"
                            component={TextField}
                            underlineShow={false}
                            hintText="Email"
                            floatingLabelText="Email"

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
const Login = reduxForm({
    form: 'login'
})(LoginForm);

export default Login;