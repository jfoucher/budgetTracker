import * as types from './constants/actionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware } from 'redux'
import PouchDB from 'pouchdb'
import {combineForms} from  'react-redux-form';
import thunk from 'redux-thunk';

const configureStore = () => {
    const db = new PouchDB('todos');
    const initialTransaction = {
        amount: '',
        date: '',
    };
    const pouchMiddleware = PouchMiddleware({
        path: '/todos',
        db: db,
        actions: {
            remove: doc => { return { type: types.REMOVE, id: doc._id } },
            insert: doc => { return { type: types.ADD, transaction: doc } },
            //update: doc => { return { type: types.UPDATE_TODO, todo: doc } },
        }
    })

    const store = createStore(
        combineForms({
            transaction: initialTransaction,
        }),
        undefined,
        applyMiddleware(pouchMiddleware, thunk)
    )

    return store
}
const Store = configureStore();
export default Store;