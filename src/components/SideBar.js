import React, { Component } from 'react';
import {RaisedButton, FlatButton, Dialog, Drawer, AppBar, Divider, IconButton} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {Visible, Hidden} from 'react-grid-system'
import UserButtons from './UserButtons';
import {NavigationClose} from 'material-ui/svg-icons';

class SideBar extends Component {

    render() {


        return (
            <Drawer open={this.props.open}>
                <AppBar
                    zDepth={1}
                    title="Menu"
                    onLeftIconButtonTouchTap={this.props.handleClose}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    />
                <Visible xs>
                    <div style={{margin:"1em"}}>
                        <UserButtons db={this.props.db}/>
                    </div>
                    <Divider/>
                </Visible>
                {this.props.menuItems}
            </Drawer>

        );
    }
}


export default SideBar;