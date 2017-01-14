import React, { Component } from 'react';
import {
    ToolbarGroup,
    Snackbar
} from 'material-ui';
import Signup from './Signup';
import Login from './Login';
import LoggedIn from './Logged';
import md5 from 'md5'
import PouchDB from 'pouchdb'
import {DB} from '../store'
import {getBase64Image} from '../utils'
import {Visible} from 'react-grid-system'

var sync = false;

class UserButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            logged: false,
            remoteDB: false,
            user: false,
            sep: ''
        };
    }

    componentDidMount() {
        if(this.props.sep) {
            this.setState({sep: this.props.sep});
        }

        if(!sync || !this.state.user) {
            //Check if we're logged in
            DB.get('currentUser').then((user) => {
                console.log('componentDidMount get local current user', user);
                //Only do this if our user is logged in
                if (user.loggedIn === true) {
                    this.setState({user: user});
                    console.log('componentDidMount local user marked as logged in');
                    //Check if we can connect to our database.
                    const remoteDB = new PouchDB('https://api.budgt.eu/u-' + md5(user.username), {
                        skip_setup: true,
                        ajax: {cache: false}
                    });
                    //Try and get anything to see if we're logged in
                    console.log('database is ', 'https://api.budgt.eu/u-' + md5(user.username));
                    remoteDB.get('currentUser').then((u)=> {
                        //console.log('constructor got remote user', u);
                        this.setState({remoteDB: remoteDB});
                        //Set up sync since we're logged in
                        this.setupSync(remoteDB);
                    }).catch((e, r)=> {
                        if (e.status === 0) {
                            console.log('We are offline, display as if we\'re logged in but with local data, making sure to still setup sync');
                            console.log(user, remoteDB);
                            this.setState({user: user, remoteDB: remoteDB});
                            //Set up sync since we're logged in
                            this.setupSync(remoteDB);
                        } else if (e.message === 'no_db_file') {
                            console.log('database should be ' + 'https://api.budgt.eu/u-' + md5(user.username), e)
                        } else {
                            this.setState({user: false});
                        }
                        console.log('not logged in', e, r)
                    });
                }
            });
        }
    }

    setupSync(remoteDB){
        console.log('setting up sync', sync);
        if(!sync) {
            sync = DB.sync(remoteDB, {
                live: true,
                retry: true
            });
            sync.on('change', function (change) {
                    console.log('change sync', change);
                }).on('error', function (err) {
                    console.error('sync error', err);
                });
        }
        console.log('Sync is set up', sync);

    }

    submitLogin  = (a) => {
        //console.log('logging in', a);
        const username = a.email.toLowerCase();
        const ajaxOpts = {
            ajax: {
                headers: {
                    Authorization: 'Basic ' + window.btoa(username + ':' + a.password)
                }
            },
            auth: {
                username: username,
                password: a.password
            }
        };


        const remoteDB = new PouchDB('https://api.budgt.eu/u-'+md5(username), {skip_setup:true, ajax: {cache: false}});
        this.setState({remoteDB: remoteDB});
        var loginPromise = remoteDB.login(username, a.password, ajaxOpts);
        const loginDone = new Promise((resolve, reject) => {
            loginPromise.then(function (loginResult) {
                console.log('successful login', loginResult);
                remoteDB.getUser(username).then((u) => {
                    console.log('got remote user', u);
                    console.log('got remote user', username);


                    const url = 'https://www.gravatar.com/avatar/'+md5(u.name.toLowerCase())+'.jpg?s=120';
                    DB.get('currentUser').then((currentUser) => {
                        console.log('got local currentUser', currentUser);
                        //Remote db is source of truth for user data, update local user
                        if(u.name !== currentUser.email || !currentUser.avatar) {
                            //Email changed, get avatar
                            console.log('Unknown user logging in, update avatar');
                            getBase64Image(url).then((r) => {
                                console.log('got gravatar image', r);
                                currentUser.avatar = r;
                            }).catch((e) => {
                                console.log('avatar image failed to load, proceed', e);

                            }).then((r) => {
                                currentUser.email = u.name;
                                currentUser.username = u.name.toLowerCase();
                                currentUser.fullname = u.fullname;
                                currentUser.loggedIn = true;

                                console.log('currentUser', currentUser);

                                resolve(currentUser);
                                DB.put(currentUser).then((newUser) => {
                                    console.log('user updated from ', currentUser, 'to', newUser);
                                }).catch((putUserError) => {
                                    console.log('could not update local user', putUserError);
                                    reject({message: 'could not update local user', error: putUserError});
                                });
                            });
                        } else {
                            currentUser.email = u.name;
                            currentUser.username = u.name.toLowerCase();
                            currentUser.fullname = u.fullname;
                            currentUser.loggedIn = true;


                            console.log('currentUser', currentUser);

                            resolve(currentUser);
                            DB.put(currentUser).then((newUser) => {
                                console.log('user updated from ', currentUser, 'to', newUser);
                            }).catch((putUserError) => {
                                console.log('could not update local user', putUserError);
                                reject({message: 'could not update local user', error: putUserError});
                            });
                        }


                    }).catch((localUserError) => {
                        //Local user is not created, probably because we signed up on another device
                        //get remote user and Put it

                        const currentUser = {
                            _id: 'currentUser',
                            loggedIn: true,
                            fullname: u.fullname,
                            email: a.email,
                            username: username
                        };

                        getBase64Image(url).then((r) => {
                            console.log('got gravatar image', r);
                            currentUser.avatar = r;
                        }).catch((e) => {
                            console.log('avatar image failed to load, proceed', e);
                        }).then((r) => {
                            DB.put(currentUser).then((newUser) => {
                                resolve(currentUser);
                            }).catch((putUserError) => {
                                console.log('could not update local user', putUserError);
                                reject({message: 'Could not create local user', error: putUserError});
                            });
                        });
                    })

                }).catch((e) => {
                    reject({message:'Login failed. Are you online ?', error: e});
                    console.log('could not get remote user', e);
                });


            }).catch(function(e) {
                if(e.status === 0) {
                    console.log('could not login, offline', e);
                    reject({message:'Login failed. Are you online ?', error: e});
                }else {
                    console.log('could not login', e)
                    reject({message:'Login failed: '+e.reason, error: e});
                }

                remoteDB.close();
            });
        });
        loginDone.then((user) => {
            this.setState({user:{fullname: user.fullname, email:user.email, username: username, avatar: user.avatar}, remoteDB: remoteDB});
            //Set up sync since we're logged in
            this.setupSync(remoteDB);
            this.props.showSnackbar({
                message: 'Login successful',
                open: true
            });
        }).catch((e)=>{
            console.log(e);
            this.props.showSnackbar({
                message: e.message,
                open: true
            });
        });


        return loginDone;
    };


    submitSignup  = (a, b, c) => {
        //document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

        const username = a.email.toLowerCase();
        //console.log('SIGNUP', a, b, c);
        //TODO show spinner or progress bar
        //Set up remote database
        const remoteDB = new PouchDB('https://api.budgt.eu/u-'+md5(username), {skip_setup:true, ajax: {cache: false}});
        //Create new user in _users table on remote database
        var signupPromise = remoteDB.signup(username, a.password, {
            metadata: {
                fullname: a.name
            }
        });


        const signupDone =  new Promise((resolve, reject) => {
            signupPromise.then((r) => {

                //console.log('remote user signup ok', r);

                //This creates the remote database with the current user as only authenticated user
                fetch('https://api.budgt.eu/db.php', {
                    method: 'GET'
                }).then((r) => {
                    //console.log('Successfully created user database', r);

                    //Then create local user with same data in "data" field
                    //and loggedIn field to true

                    DB.put({
                        _id: 'currentUser',
                        loggedIn: true,
                        fullname: a.name,
                        email: a.email,
                        username: username,
                        avatar: ''
                    }).then(()=>{
                        //login
                        //console.log('sucessfully created local user')
                        this.submitLogin(a).then((u) => {
                            //console.log('sucessfully logged in')
                            //Get remote user
                            remoteDB.getUser(username).then((u) => {
                                //console.log('got remote user', u);

                                resolve(u);

                            }).catch((e) => {
                                reject({message: 'Could not get remote user', error: e});
                                //console.log('could not get remote user', e);
                            });

                        }).catch((e) => {
                            reject({message: 'Could not log you in.', error: e});
                        });
                    }).catch((e) => {
                        if(e.status === 409) {
                            reject({message: 'You already have an account on this machine, try logging in with it.', error: e, link:{"label": 'more info', url:"https://budgt.eu/"}});
                        } else {
                            reject({message: 'Could not create your account, sorry. Contact us if this error persists', error: e});
                        }

                        //console.log('Could not create local user', e);
                    })


                }).catch((e) => {
                    reject({message: 'Could not create the remote database', error: e});
                    //TODO Display alert with error message
                    //console.log(e)
                })
            }).catch((e) => {
                //TODO Display alert with error message
                if(e.status === 409) {
                    reject({message: 'This account already exists, try logging in', error: e});
                } else {
                    //console.log('remote db is','https://api.budgt.eu/u-'+md5(username));
                    //console.log('Could not create your account, sorry. Are you online?', e)
                    reject({message: 'Could not create your account, sorry. Are you online?', error: e});
                }

                //console.log('SIGNUP FAILED', e);
            });
        });

        signupDone.then((user) => {
            this.props.showSnackbar({
                message: 'Welcome to Budgt, ' + user.fullname,
                open: true
            });
        }).catch((e) => {
            this.props.showSnackbar({
                message: e.message,
                open: true
            });
        });
        return signupDone;

    };

    signOut = () => {
        //console.log('log out');

        DB.get('currentUser').then((user) => {
            user.loggedIn = false;
            DB.put(user).then(() => {
                this.props.showSnackbar({
                    message: 'Successfully logged out',
                    open: true
                });
            });
            this.setState({user:false});
        }).catch((e) => {
            //console.log('could not update local user in logout')
        });

        this.state.remoteDB.logout().then(()=>{
            //console.log('logged out from db');
            this.state.remoteDB.close();
            this.setState({remoteDB: false});
        }).catch((e) => {
            //console.log('could not logout', e)
        })
    }

    render() {

        if(this.state.user) {
            return (<div>
                <LoggedIn onLogout={this.signOut} user={this.state.user} inSidebar={this.props.inSidebar} />
            </div>)
        }
        return (
            <div>
                <ToolbarGroup><Login onSubmit={this.submitLogin}/>{this.state.sep}<Signup onSubmit={this.submitSignup}/></ToolbarGroup>
            </div>
            )

    }
}
export default UserButtons;