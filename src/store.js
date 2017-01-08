import * as types from './constants/actionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import PouchDB from 'pouchdb'
import Transactions from './reducers/Transactions';
import Categories from './reducers/Categories';
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import visibilityFilter from './reducers/visibilityFilter'
import {guid} from './utils'
PouchDB.plugin(require('pouchdb-authentication'));
PouchDB.debug.disable();

const DB = new PouchDB('budgetTracker2');

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
                return !doc._deleted && doc.type && doc.type === 'category' && doc.default !== true;
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


    //TODO create default categories here

    const defaultCategories = [
        {_id:guid(), name: 'Groceries', color:'#26a69a', type:"category", default:true},
        {_id:guid(), name: 'Household Goods', color:'#ffe0b2', type:"category", default:true},
        {_id:guid(), name: 'Rent', color:'#d84315', type:"category", default:true},
        {_id:guid(), name: 'Mortgage', color:'#e0e0e0', type:"category", default:true},
        {_id:guid(), name: 'Car', color:'#f9a825', type:"category", default:true},
        {_id:guid(), name: 'Fuel', color:'#b2ff59', type:"category", default:true},
        {_id:guid(), name: 'Home Bills', color:'#81d4fa', type:"category", default:true},
    ]
    return createStoreWithMiddleware(combineReducers(reducers), {transactions:[], categories: defaultCategories});
}
const Store = store();
export {
    Store,
    DB
};