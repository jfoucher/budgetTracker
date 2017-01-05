import React, { Component } from 'react';
import {RaisedButton, FlatButton, Dialog} from 'material-ui';
import { Field, reduxForm } from 'redux-form';


class Alert extends Component {


    constructor(props) {
        super(props);
        this.state={
            open: this.props.open,
        }
    }

    handleClose = () => {
        this.setState({open:!this.state.open});
    }


    render() {
        const actions = [
            <FlatButton
                label="Got it"
                secondary={true}
                onTouchTap={this.handleClose}
                />
        ];

        return (
                <Dialog title={this.props.title}
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                    {this.props.text}
                </Dialog>

        );
    }
}


export default Alert;