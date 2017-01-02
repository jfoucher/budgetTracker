import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import SpentForm from './components/SpentForm';
import TransactionsTable from './components/TransactionsTable';
import Transactions from './reducers/Transactions';
import Login from './components/Login';
import LoggedIn from './components/Logged';
import { Provider } from 'react-redux';
import * as types from './constants/actionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import PouchDB from 'pouchdb'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar} from 'material-ui';

//TODO make this configurable
const db = new PouchDB('budget4');
const remoteDB = new PouchDB('https://couchdb-d020c7.smileupps.com/budget4');
db.sync(remoteDB, {
    live: true
}).on('change', function (change) {
    console.log('change sync', change);
}).on('error', function (err) {
    console.error('sync error', err);
});

const pouchMiddleware = PouchMiddleware({
    path: '/transactions',
    db: db,
    actions: {
        remove: doc => {
            return {type:types.REMOVE, data: doc};
        },
        insert: doc => {
            return {type:types.ADD, data: doc};
        },
        update: doc => {
            return {type:types.UPDATE, data: doc};
        }
    }
});
const reducers = {
    transactions: Transactions,
    form: formReducer
};

const applyMiddlewares = applyMiddleware(
    pouchMiddleware,
    thunk
    //logger
);

const createStoreWithMiddleware = compose(
    applyMiddlewares
)(createStore);

const store = createStoreWithMiddleware(combineReducers(reducers), {transactions:[]});

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged: false
        }
    }
    dosubmit  = (a) => {
        //TODO save categories here
        store.dispatch( {type:types.ADD, data: a});
    };

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <div className="App">
                        <AppBar
                            title="Budget"
                            iconElementRight={this.state.logged ? <LoggedIn /> : <Login />}
                            />
                        <div className="App-form">
                            <SpentForm onSubmit={this.dosubmit} />
                        </div>
                        <div className="table">
                            <TransactionsTable store={store} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
