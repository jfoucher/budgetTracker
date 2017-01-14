import React, { Component } from 'react';
import {RaisedButton, Divider, FlatButton, Dialog} from 'material-ui';
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
        }
    }
    handleClose = () => {
        this.setState({open:!this.state.open});
    }

    sendSubmit = () => {
        this.setState({open:!this.state.open});

        var login = this.props.handleSubmit();
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
                label="Login"
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
                            type="email"
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

            </div>
        );
    }
}
const Login = reduxForm({
    form: 'login'
})(LoginForm);

export default Login;