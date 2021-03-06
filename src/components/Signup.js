import React, { Component } from 'react';
import {RaisedButton, Divider, FlatButton, Dialog, Snackbar} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {
    TextField
} from 'redux-form-material-ui'
import {getScreenClass} from '../utils'
import muiThemeable from 'material-ui/styles/muiThemeable';


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

        }).catch((e) => {

        }).then(()=>{
            this.setState({
                open: false
            });
        })
    }

    render() {
        const  { handleSubmit, submitting } = this.props;
        var css = {};
        //console.log(getScreenClass(true, true));
        if(getScreenClass(true, true) === "xs") {
            css = {
                maxWidth:"none",
                width: "100%",
                maxHeight: "none",
                height: "100%",
                overflow: "scroll"
            }
        }
        //console.log('css', css)
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
            <div style={{height: "100%"}}>
                <RaisedButton title="Signup to sync and backup your data" secondary={true} label="Signup" onTouchTap={this.handleClose} />
                <Dialog title="Register to sync and backup your data"
                        titleStyle={{color: this.props.muiTheme.palette.alternateTextColor, backgroundColor: this.props.muiTheme.palette.primary1Color}}
                        className="signupForm"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        contentStyle={css}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleClose}>
                    <p>1 month free trial and then just $1/month</p>
                    <form onSubmit={handleSubmit} style={{height: "100%"}}>
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


                    </form>

                </Dialog>

            </div>
        );
    }
}


const Signup = reduxForm({
    form: 'signup',
    validate
})(muiThemeable()(SignupForm));

export default Signup;