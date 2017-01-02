import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import SpentForm from './components/SpentForm';
import TransactionsTable from './components/TransactionsTable';
import Transactions from './reducers/Transactions';
import Categories from './reducers/Categories';
import Login from './components/Login';
import LoggedIn from './components/Logged';
import { Provider } from 'react-redux';
import * as types from './constants/actionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import PouchDB from 'pouchdb'
import { reducer as formReducer, reset } from 'redux-form'
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

const pouchMiddleware = PouchMiddleware([
    {
        path: '/transactions',
        db: db,
        changeFilter: (doc) => {
            return !doc._deleted && doc.type && doc.type === 'transaction';
        },
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
    },
    {
        path: '/categories',
        db: db,
        changeFilter: (doc) => {
            console.log('filter', doc);
            return !doc._deleted && doc.type && doc.type === 'category';
            //doc.type && doc.type === 'category';
        },
        actions: {
            remove: doc => {
                console.log('remove category', doc)
                return {type:types.REMOVE_CATEGORY, data: doc};
            },
            insert: doc => {
                console.log('insert category', doc)
                return {type:types.ADD_CATEGORY, data: doc};
            },
            update: doc => {
                console.log('update category', doc)
                return {type:types.UPDATE_CATEGORY, data: doc};
            }
        }
    }
]);
const reducers = {
    transactions: Transactions,
    categories: Categories,
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

const store = createStoreWithMiddleware(combineReducers(reducers), {transactions:[], categories: []});

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged: false
        }
    }
    dosubmit  = (a) => {
        store.dispatch( {type:types.ADD_CATEGORY, data: {name: a.category, type: "category"}});
        store.dispatch(reset('transaction'));
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
                            <SpentForm onSubmit={this.dosubmit} store={store} />
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
