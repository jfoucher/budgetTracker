import * as types from './constants/actionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import PouchDB from 'pouchdb'
import Transactions from './reducers/Transactions';
import Categories from './reducers/Categories';
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import visibilityFilter from './reducers/visibilityFilter'
PouchDB.plugin(require('pouchdb-authentication'));

const DB = new PouchDB('budgetTracker');

const store = function() {

    const pouchMiddleware = PouchMiddleware([
        {
            path: '/transactions',
            db: DB,
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
            db: DB,
            changeFilter: (doc) => {
                return !doc._deleted && doc.type && doc.type === 'category';
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
        form: formReducer,
        visibilityFilter: visibilityFilter,
    };

    const applyMiddlewares = applyMiddleware(
        pouchMiddleware,
        thunk
        //logger
    );

    const createStoreWithMiddleware = compose(
        applyMiddlewares
    )(createStore);

    return createStoreWithMiddleware(combineReducers(reducers), {transactions:[], categories: [], UIReducer: false});
}
const Store = store();
export {
    Store,
    DB
};