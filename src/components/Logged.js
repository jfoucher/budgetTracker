import React, { Component } from 'react';
//import {FlatButton, IconButton, MoreVertIcon, MenuItem, IconMenu, NavigationClose} from 'material-ui';
import {MenuItem, Popover, Menu, FloatingActionButton, Avatar} from 'material-ui';



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

        const arrow = this.state.open ? "▲" : "▼";
        return (
            <div style={{display: "table-cell"}}>

                <FloatingActionButton mini={true} onTouchTap={this.handleTouchTap}>
                    <Avatar
                        src={this.props.user.avatar}
                        />

                </FloatingActionButton>
                <div onTouchTap={this.handleTouchTap} style={{verticalAlign:"bottom",float:"right", transform:"scaleY(0.7) translateY(30px)", color:"#fff", cursor: "pointer", marginLeft:"0.5em",  display: "inline-block", lineHeight: "1.7em", fontSize:"14px"}}>{arrow}</div>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu>

                        <MenuItem primaryText="Sign out" onTouchTap={this.props.onLogout}/>
                    </Menu>
                </Popover>

            </div>
        );
    }
}

export default LoggedIn