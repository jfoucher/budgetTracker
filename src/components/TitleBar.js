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
    FontIcon
} from 'material-ui';
import PouchDB from 'pouchdb'
import muiThemeable from 'material-ui/styles/muiThemeable';
import Signup from './Signup';
import Login from './Login';
import LoggedIn from './Logged';
import {NavigationExpandMoreIcon} from 'material-ui/svg-icons';


class TitleBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value:1,
            logged:false,
            remoteDB: false
        }

    }

    submitLogin  = (a, b, c) => {
        console.log('login', a, b, c)
        const ajaxOpts = {
            ajax: {
                headers: {
                    Authorization: 'Basic ' + window.btoa(a.email + ':' + a.password)
                }
            },
            auth: {
                username: a.email,
                password: a.password
            }
        };
        var _this = this;
        const remoteDB = new PouchDB('https://couchdb-d020c7.smileupps.com/'+a.email);
        this.setState({remoteDB: remoteDB});
        var loginPromise = remoteDB.login(a.email, a.password, ajaxOpts);
        const db = this.props.db;
        loginPromise.then(function (arg1, arg2, arg3) {
            console.log("logged in", arg1, arg2, arg3);
            _this.setState({logged: true});
            //TODO only do this if the user is authenticated

            db.sync(remoteDB, {
                live: true,
                retry: true
            }).on('change', function (change) {
                console.log('change sync', change);
            }).on('error', function (err) {
                console.error('sync error', err);
            });
        }).catch(function(e) {
            console.log('could not login', e)
            remoteDB.close();
        });
        return loginPromise;
    };


    submitSignup  = (a, b, c) => {

        console.log('login', a, b, c);
        const ajaxOpts = {
            ajax: {
                headers: {
                    Authorization: 'Basic ' + window.btoa(a.email + ':' + a.password)
                }
            },
            auth: {
                username: a.email,
                password: a.password
            }
        };
        const remoteDB = new PouchDB('https://couchdb-d020c7.smileupps.com/'+a.email, {skip_setup:true});
        var signupPromise = remoteDB.signup(a.email, a.password);
        const db = this.props.db;
        signupPromise.then(() => {
            fetch('http://ns3292355.ip-5-135-187.eu/db.php', {
                method: 'GET'
            }).then(function(a) {console.log('updated db', a.json())}).catch(function(e){console.log(e)})
        });
        return signupPromise;
    };

    signOut = () => {
        this.state.remoteDB.logout().then(()=>{
            this.state.remoteDB.close();
            this.setState({logged:false,remoteDB: false});
        })
    }

    render() {
        let right = <ToolbarGroup><Login onSubmit={this.submitLogin}/><ToolbarSeparator /><Signup onSubmit={this.submitSignup}/></ToolbarGroup>
        if(this.state.logged) {
            right = <LoggedIn onLogout={this.signOut} />
        }
        return (

            <Toolbar style={{backgroundColor: this.props.muiTheme.palette.primary1Color}}>
                <ToolbarGroup>
                    <ToolbarTitle  style={{color: this.props.muiTheme.palette.alternateTextColor}} text="Budget" />
                </ToolbarGroup>
                <ToolbarGroup>

                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarSeparator />
                    {right}


                </ToolbarGroup>
            </Toolbar>

        );
    }
}
export default muiThemeable()(TitleBar);