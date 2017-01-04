import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ReactGridLayout from 'react-grid-layout';
import SpentForm from './components/SpentForm';
import TitleBar from './components/TitleBar';
import TransactionsTable from './components/TransactionsTable';
import Transactions from './reducers/Transactions';
import Categories from './reducers/Categories';

import { Provider } from 'react-redux';
import * as types from './constants/actionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import PouchDB from 'pouchdb'

import { reducer as formReducer, reset } from 'redux-form'
import thunk from 'redux-thunk';
import { deepOrange500, deepOrange700,
    green500,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Drawer,
    AppBar,
    MenuItem
} from 'material-ui';
import {fade} from 'material-ui/utils/colorManipulator';
import {ContentAdd} from 'material-ui/svg-icons';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: deepOrange500,
        primary2Color: deepOrange700,
        primary3Color: grey400,
        accent1Color: green500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: deepOrange500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar: {
        height: 65,
    },
});

PouchDB.plugin(require('pouchdb-authentication'));

//TODO the local database can have any name
const db = new PouchDB('budgetTracker');




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
                return {type:types.REMOVE_CATEGORY, data: doc};
            },
            insert: doc => {
                return {type:types.ADD_CATEGORY, data: doc};
            },
            update: doc => {
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
            logged: false,
            open: false
        }
    }
    dosubmit  = (a) => {
        store.dispatch( {type:types.ADD_CATEGORY, data: {name: a.category, type: "category"}});
        store.dispatch(reset('transaction'));
        store.dispatch( {type:types.ADD, data: a});
    };


    //TODO submit to store, reduce transactions to various months, save in state, and display in drawaers

    render() {

        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="App">
                        <TitleBar logged={this.state.logged} db={db} />

                        <Drawer open={this.state.open}>
                            <AppBar title="Budget" onLeftIconButtonTouchTap={()=>{
                           this.setState({open:!this.state.open})
                            }}/>
                            <MenuItem>Menu Item</MenuItem>
                            <MenuItem>Menu Item 2</MenuItem>
                        </Drawer>
                        <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                            <div className="table" key="b" data-grid={{x: 0, y: 0, w: 16, h: 2, minW: 2, maxW: 16}}>
                                <TransactionsTable store={store} />
                            </div>
                        </ReactGridLayout>
                        <SpentForm onSubmit={this.dosubmit} store={store} />
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
