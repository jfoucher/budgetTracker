import React, { Component } from 'react';
import {
    ToolbarGroup
} from 'material-ui';
import PouchDB from 'pouchdb'
import Signup from './Signup';
import Login from './Login';
import LoggedIn from './Logged';
import md5 from 'md5'
import {DB} from '../store'

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
        DB.get('currentUser').then((user) => {
            //Only do this if our user is logged in
            if(user.loggedIn === true) {
                //Check if we can connect to our database.
                const remoteDB = new PouchDB('https://api.budgt.eu/u-'+md5(user.email),{skip_setup:true, ajax: {cache: false}});
                //Try and get anything to see if we're logged in
                remoteDB.get('currentUser').then((user)=>{
                    this.setState({user:{fullname:user.fullname, email: user.email}, remoteDB: remoteDB});
                    //Set up sync since we're logged in
                    this.setupSync(remoteDB);
                }).catch((e, r)=>{
                    console.log('not logged in', e, r)
                });
            }


        });
    }

    componentDidMount() {
        if(this.props.sep) {
            this.setState({sep: this.props.sep});
        }
    }

    setupSync(remoteDB){
        DB.sync(remoteDB, {
            live: true,
            retry: true
        }).on('change', function (change) {
            console.log('change sync', change);
        }).on('error', function (err) {
            console.error('sync error', err);
        });
    }

    submitLogin  = (a) => {
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


        const remoteDB = new PouchDB('https://api.budgt.eu/u-'+md5(a.email), {skip_setup:true, ajax: {cache: false}});
        this.setState({remoteDB: remoteDB});
        var loginPromise = remoteDB.login(a.email, a.password, ajaxOpts);
        const loginDone = new Promise((resolve, reject) => {
            loginPromise.then(function (loginResult) {

                remoteDB.getUser(a.email).then((u) => {

                    DB.get('currentUser').then((currentUser) => {
                        //Modify it
                        console.log('got current local user', currentUser);
                        currentUser.loggedIn = true;
                        resolve(currentUser);
                        DB.put(currentUser).then((newUser) => {
                            console.log('user updated from ', currentUser, 'to', newUser);
                        }).catch((putUserError) => {
                            console.log('could not update local user', putUserError);
                            reject({message: 'could not update local user', error: putUserError});
                        });
                    }).catch((localUserError) => {

                        reject({message:'could not get local user', error: localUserError});
                        console.log('could not get local user', localUserError);

                    })

                }).catch((e) => {
                    reject({message:'could not get remote user', error: e});
                    console.log('could not get remote user', e);
                });


            }).catch(function(e) {
                //console.log('could not login', e)
                remoteDB.close();
            });
        });
        loginDone.then((user) => {
            this.setState({user:{fullname: user.fullname, email:user.email}, remoteDB: remoteDB});
            //Set up sync since we're logged in
            this.setupSync(remoteDB);
        });

        return loginDone;
    };


    submitSignup  = (a, b, c) => {

        console.log('login', a, b, c);
        //TODO show spinner or progress bar
        //Set up remote database
        const remoteDB = new PouchDB('https://api.budgt.eu/u-'+md5(a.email), {skip_setup:true, ajax: {cache: false}});
        //Create new user in _users table on remote database
        var signupPromise = remoteDB.signup(a.email, a.password, {
            metadata: {
                fullname: a.name
            }
        });


        return new Promise((resolve, reject) => {
            signupPromise.then((r) => {

                console.log('remote user signup ok', r);

                //This creates the remote database with the current user as only authenticated user
                fetch('http://ns3292355.ip-5-135-187.eu/db.php', {
                    method: 'GET'
                }).then((r) => {
                    console.log('Successfully created user database', r);

                    //Then create local user with same data in "data" field
                    //and loggedIn field to true

                    DB.put({
                        _id: 'currentUser',
                        loggedIn: true,
                        fullname: a.name,
                        email: a.email
                    }).then(()=>{
                        //login
                        console.log('sucessfully created local user')
                        this.submitLogin(a).then((u) => {
                            console.log('sucessfully logged in')
                            //Get remote user
                            remoteDB.getUser(a.email).then((u) => {
                                console.log('got remote user', u);

                                resolve(u);

                            }).catch((e) => {
                                reject({message: 'Could not get remote user', error: e});
                                console.log('could not get remote user', e);
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

                        console.log('Could not create local user', e);
                    })


                }).catch((e) => {
                    reject({message: 'Could not create the remote database', error: e});
                    //TODO Display alert with error message
                    console.log(e)
                })
            }).catch((e) => {
                //TODO Display alert with error message
                if(e.status === 409) {
                    reject({message: 'This account already exists, try logging in', error: e});
                } else {
                    reject({message: 'Could not create your account, sorry. Are you online?', error: e});
                }

                console.log('SIGNUP FAILED', e);
            });
        });

    };

    signOut = () => {
        console.log('log out');
        this.state.remoteDB.logout().then(()=>{
            //console.log('logged out from db');
            DB.get('currentUser').then((user) => {
                user.loggedIn = false;
                DB.put(user);
            }).catch((e) => {
                console.log('could not update local user in logout')
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