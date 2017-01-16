import * as t from '../constants/actionTypes';
import {guid} from '../utils'
import {filterActions } from 'redux-ignore';

const initialState = [];


function Transactions(state = initialState, action) {

    //console.log('transactions reducer', state, action);

    switch (action.type) {
        case t.ADD:
            //console.log('ADDING transaction state : ', state, 'action:', action);

            let e = {
                _id: action.data._id || guid(),
                amount: action.data.amount,
                date: action.data.date,
                category: action.data.category,
                type: 'transaction'
            }
            if(action.data._rev) {
                e._rev = action.data._rev
            }
            return [e,
                ...state
                ]



        case t.REMOVE:
            return state.map((doc) => {
                if (doc._id === action.data._id) {
                    doc._deleted = true;
                    return doc;
                }
                return doc;
            });


        case t.RESTORE:
            const filtered = state.filter((t) => {
                return t._id !== action.data._id;
            });
            const d = {
                _id: guid(),
                amount: action.data.amount,
                date: action.data.date,
                category: action.data.category,
                type: 'transaction'
            };
            return [d,
                ...filtered
            ];
        case t.UPDATE:
            if(state){
                return state.map(doc => {
                        if (doc._id === action.data._id) {
                            return action.data;
                        } else {
                            return doc;
                        }
                    }
                );
            }
            return state;


        default:
            return state;
    }
}

export default filterActions(Transactions, [t.ADD, t.RESTORE, t.UPDATE, t.REMOVE]);
//export default Transactions;