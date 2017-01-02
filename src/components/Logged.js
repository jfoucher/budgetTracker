import React, { Component } from 'react';
//import {FlatButton, IconButton, MoreVertIcon, MenuItem, IconMenu, NavigationClose} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class LoggedIn extends Component {
    static muiName = 'IconMenu';

    render() {
        //return(<FlatButton {...this.props} label="Logged" />);
        return (
            <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon color="#fff" /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }
}

export default LoggedIn