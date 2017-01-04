import React, { Component } from 'react';
//import {FlatButton, IconButton, MoreVertIcon, MenuItem, IconMenu, NavigationClose} from 'material-ui';
import {IconButton, IconMenu, MenuItem, Avatar, Paper, FlatButton, Popover, Menu, RaisedButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import md5 from 'md5'

class LoggedIn extends Component {
    static muiName = 'IconMenu';
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };



    render() {
        //return(<FlatButton {...this.props} label="Logged" />);
        const url = 'https://www.gravatar.com/avatar/'+md5('jfoucher@gmail.com'.toLowerCase())+'.jpg?s=100';

        return (
            <div>
                <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Welcome Jonathan"
                    primary={true}
                    />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu>
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help &amp; feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Sign out" onTouchTap={this.props.onLogout}/>
                    </Menu>
                </Popover>

            </div>
        );
    }
}

export default LoggedIn