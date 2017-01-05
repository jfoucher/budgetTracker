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
import PouchDB from 'pouchdb'
import Signup from './Signup';
import Login from './Login';
import LoggedIn from './Logged';
import {NavigationExpandMoreIcon, NavigationMenu} from 'material-ui/svg-icons';
import md5 from 'md5'
import {Visible, Hidden} from 'react-grid-system'


class UserButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value:1,
            logged:false,
            remoteDB: false,
            user:false,
            sep:''
        }



        //Check if we're logged in
        this.props.db.get('currentUser').then((user) => {
            console.log('current user is ', user);
            //Check if we can connect to our database.
            console.log('trying to access this database : ','https://couchdb-b87a6e.smileupps.com/u-'+md5(user.data.name));
            const remoteDB = new PouchDB('https://couchdb-b87a6e.smileupps.com/u-'+md5(user.data.name));
            remoteDB.get('currentUser').then((user)=>{
                console.log('got remote current user', user);
                this.setState({user:user.data, remoteDB: remoteDB});
                this.setupSync(remoteDB);
            }).catch((e, r)=>{
                console.log('not logged in', e, r)
            })

        });
    }

    componentDidMount() {
        if(this.props.sep) {
            this.setState({sep: this.props.sep});
        }
    }

    setupSync(remoteDB){
        this.props.db.sync(remoteDB, {
            live: true,
            retry: true
        }).on('change', function (change) {
            console.log('change sync', change);
        }).on('error', function (err) {
            console.error('sync error', err);
        });
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
        const remoteDB = new PouchDB('https://couchdb-b87a6e.smileupps.com/u-'+md5(a.email), {skip_setup:true});
        this.setState({remoteDB: remoteDB});
        var loginPromise = remoteDB.login(a.email, a.password, ajaxOpts);
        const db = this.props.db;

        loginPromise.then(function (loginResult) {

            remoteDB.getUser(a.email).then((u) => {
                console.log('USER is ',u);
                _this.setState({user: u});
                db.get('currentUser').then((currentUser) => {
                    console.log('got current user from local db', currentUser);
                    //Modify it
                    u._rev = currentUser._rev;
                    db.put({
                        _id: 'currentUser',
                        data: u
                    }).then((newUser) => {
                        console.log('user updated from ', currentUser, 'to', newUser);
                    }).catch((putUserError) => {
                        console.log('could not update local user', putUserError);
                    });
                }).catch((localUserError) => {
                    console.log('could not get local user', localUserError);
                    db.put({
                        _id: 'currentUser',
                        data: u
                    }).then((newUser) => {
                        console.log('local user created', newUser);
                    }).catch((putUserError) => {
                        console.log('could not update local user', putUserError);
                    });
                })

            });
            //only do this if the user is authenticated
            _this.setupSync(remoteDB);

        }).catch(function(e) {
            console.log('could not login', e)
            remoteDB.close();
        });
        return loginPromise;
    };


    submitSignup  = (a, b, c) => {

        console.log('login', a, b, c);

        const remoteDB = new PouchDB('https://couchdb-b87a6e.smileupps.com/u-'+md5(a.email));
        var signupPromise = remoteDB.signup(a.email, a.password, {
            metadata: {
                fullname: a.name
            }
        });
        const db = this.props.db;
        const login = this.submitLogin;
        signupPromise.then(() => {
            fetch('http://ns3292355.ip-5-135-187.eu/db.php', {
                method: 'GET'
            }).then(function(r) {
                console.log('updated db', r.json());

                login(a)
            }).catch(function(e){console.log(e)})
        }).catch(function(e){
            console.log(e)
        });
        return signupPromise;
    };

    signOut = () => {
        console.log('log out');
        this.state.remoteDB.logout().then(()=>{
            console.log('logged out from db');
            this.props.db.get('currentUser').then((user) => {
                this.props.db.remove(user);
            });

            this.state.remoteDB.close();
            this.setState({user:false,remoteDB: false});
        }).catch((e) => {
            console.log('could not logout', e)
        })
    }

    render() {
        if(this.state.user) {
            return (<LoggedIn onLogout={this.signOut} user={this.state.user} />)
        }
        return (
            <ToolbarGroup><Login onSubmit={this.submitLogin}/>{this.state.sep}<Signup onSubmit={this.submitSignup}/></ToolbarGroup>
        )

    }
}
export default UserButtons;