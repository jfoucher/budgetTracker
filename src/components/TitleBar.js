import React, { Component } from 'react';
import {
    Toolbar,
    ToolbarGroup,
    Drawer,
    MenuItem,
    Snackbar,
    DropDownMenu,
    ToolbarTitle,
    ToolbarSeparator,
    IconMenu,
    IconButton,
    RaisedButton,
    FlatButton,
    FontIcon,

} from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import UserButtons from './UserButtons';
import {NavigationMenu} from 'material-ui/svg-icons';
import {Visible, Hidden} from 'react-grid-system'


class TitleBar extends Component {

    render() {
        const {onMenuClick} = this.props
        return (

            <Toolbar style={{boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',backgroundColor: this.props.muiTheme.palette.primary1Color}}>
                <ToolbarGroup>

                    <IconButton onTouchTap={onMenuClick.bind(null, this.props.sidebarOpen)}>
                        <NavigationMenu color={this.props.muiTheme.palette.alternateTextColor}/>
                    </IconButton>
                    <img src="logo.png" height="35" style={{margin:"0 .8em"}} />
                    <ToolbarTitle  style={{color: this.props.muiTheme.palette.alternateTextColor,fontSize:"1.8em",lineHeight:"1.6em"}} text="Budgt" />
                </ToolbarGroup>
                <Hidden xs>
                    <ToolbarGroup>
                        <UserButtons sep={<ToolbarSeparator/>}/>
                    </ToolbarGroup>
                </Hidden>
            </Toolbar>


        );
    }
}
export default muiThemeable()(TitleBar);