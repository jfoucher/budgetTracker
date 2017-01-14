import React, { Component } from 'react';
import {Snackbar} from 'material-ui';



class Snack extends Component {

    render() {

        return (
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                action={this.props.actionLabel}
                autoHideDuration={6000}
                onRequestClose={this.props.close}
                onActionTouchTap={this.props.onActionTouchTap}
                />

        );
    }
}


export default Snack;