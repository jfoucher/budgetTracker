import * as types from './constants/actionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import PouchDB from 'pouchdb'
import Transactions from './reducers/Transactions';
import Categories from './reducers/Categories';
import { reducer as formReducer } from 'redux-form'
import visibilityFilter from './reducers/visibilityFilter'
import {filterActions } from 'redux-ignore';
import {guid} from './utils'
import thunk from 'redux-thunk'
import * as t from './constants/actionTypes';
PouchDB.plugin(require('pouchdb-authentication'));
PouchDB.debug.disable();

const DB = new PouchDB('Budgt');
const defaultCategories = [
    {_id:'groceries-default-cat', name: 'Groceries', color:'#26a69a', type:"category", default:true},
    {_id:'Household-default-cat', name: 'Household Goods', color:'#ffe0b2', type:"category", default:true},
    {_id:'Rent-default-cat', name: 'Rent', color:'#d84315', type:"category", default:true},
    {_id:'Mortgage-default-cat', name: 'Mortgage', color:'#e0e0e0', type:"category", default:true},
    {_id:'Car-default-cat', name: 'Car', color:'#f9a825', type:"category", default:true},
    {_id:'Fuel-default-cat', name: 'Fuel', color:'#b2ff59', type:"category", default:true},
    {_id:'Home-default-cat', name: 'Home Bills', color:'#81d4fa', type:"category", default:true},
];

//DB.bulkDocs(defaultCategories);
const store = function() {

    const pouchMiddleware = PouchMiddleware([
        {
            path: '/transactions',
            db: DB,
            changeFilter: (doc) => {
                console.log('transactions filtering doc', doc, !doc._deleted && doc.type && doc.type === 'transaction');
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



    return createStoreWithMiddleware(combineReducers(reducers));
}
const Store = store();

//defaultCategories.forEach((c) => {
//    Store.dispatch( {type: t.ADD_CATEGORY, data: c});
//});


export {
    Store,
    DB
};