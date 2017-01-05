import * as t from '../constants/actionTypes';
import {guid} from '../utils'

const initialState = [];


function Transactions(state = initialState, action) {
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
            return state.filter(doc =>
                doc._id !== action.data._id
            );


        case t.RESTORE:
            console.log('restore', action.data);
            const d = {
                _id: action.data._id,
                amount: action.data.amount,
                date: action.data.date,
                category: action.data.category,
                type: 'transaction'
            };
            return [d,
                ...state
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

export default Transactions