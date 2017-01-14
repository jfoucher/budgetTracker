import React, { Component } from 'react';
//import {FlatButton, IconButton, MoreVertIcon, MenuItem, IconMenu, NavigationClose} from 'material-ui';
import {ListItem, Popover, List, IconButton, Avatar, FlatButton} from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';


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
            anchorEl: document.getElementById("userAvatarButton"),
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };



    render() {

        const userDetails = <div style={{fontWeight:300, display:"inline-block", marginLeft:"1em", verticalAlign: "middle"}}>
            <div className="username" style={{color:this.props.muiTheme.palette.textColor, fontSize: "0.9em"}}>{this.props.user.fullname}</div>
            <div className="email" style={{color:this.props.muiTheme.palette.accent3Color, fontSize: "0.8em"}}>{this.props.user.email}</div>
        </div>

        return (
            <div style={{display: "table-cell", verticalAlign: "middle", paddingRight:"1em"}}>
                <IconButton onTouchTap={this.handleTouchTap}
                            iconStyle={{width:40, height:40, border:"3px solid", borderColor:this.props.muiTheme.palette.primary2Color}}
                            style={{width:46, height:46, padding:0, verticalAlign: "middle"}}
                            id="userAvatarButton"
                    >
                    <Avatar
                        size={40}
                        src={this.props.user.avatar}
                        />
                </IconButton>
                {this.props.inSidebar && this.props.user && this.props.user.fullname ? <div style={{cursor:"pointer", display:"inline-block", verticalAlign: "middle"}} onTouchTap={this.handleTouchTap}>{userDetails}</div> : ''}
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    style={{padding:"0.3em"}}
                    >
                    <div style={{display: "table-cell"}}>
                        <Avatar
                            size={60}
                            src={this.props.user.avatar}
                            style={{ verticalAlign: "middle", border:"3px solid", borderColor:this.props.muiTheme.palette.primary2Color}}
                            />
                        {userDetails}
                    </div>
                    <FlatButton style={{float:"right"}} primary={true} label="Sign out" onTouchTap={this.props.onLogout} />

                </Popover>

            </div>
        );
    }
}

export default muiThemeable()(LoggedIn);
