import React, { Component } from 'react';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    ToolbarSeparator,
    IconButton
} from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import UserButtonsContainer from '../containers/UserButtonsContainer';
import FontIcon from 'material-ui/FontIcon';

import {Hidden} from 'react-grid-system'


class TitleBar extends Component {

    render() {
        const {onMenuClick} = this.props
        return (

            <Toolbar style={{boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',backgroundColor: this.props.muiTheme.palette.primary1Color, padding:"0 12px"}}>
                <ToolbarGroup>

                    <IconButton onTouchTap={onMenuClick}>
                        <img src="icons/menu.png" width="24" />
                    </IconButton>
                    <img alt="Budgt" src="logo.png" height="35" style={{margin:"0 .8em"}} />
                    <ToolbarTitle  style={{color: this.props.muiTheme.palette.alternateTextColor,fontSize:"1.8em",lineHeight:"1.6em"}} text="Budgt" />
                </ToolbarGroup>
                <Hidden xs>
                    <ToolbarGroup>
                        <UserButtonsContainer sep={<ToolbarSeparator/>}/>
                    </ToolbarGroup>
                </Hidden>
            </Toolbar>


        );
    }
}
export default muiThemeable()(TitleBar);