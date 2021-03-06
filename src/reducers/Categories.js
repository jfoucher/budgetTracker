import * as t from '../constants/actionTypes';
import {guid} from '../utils'
import {filterActions } from 'redux-ignore';

const initialState = [];


function Categories(state = initialState, action) {
    switch (action.type) {
        case t.ADD_CATEGORY:
            const exists = state.find(doc => {
                return doc.name && action.data.name && doc.name === action.data.name
            });
            if(exists) {
                //Category already exists
                return state;
            }else{
                let e = {
                    _id: action.data._id || guid(),
                    name: action.data.name,
                    color: action.data.color || '#f5D498',
                    type: 'category'
                }
                if(action.data._rev) {
                    e._rev = action.data._rev
                }
                return [
                    e,
                    ...state
                ]
            }



        case t.REMOVE_CATEGORY:
            return state.filter(doc =>
                doc._id !== action.data._id
            );
        case t.UPDATE_CATEGORY:
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

export default filterActions(Categories, [t.ADD_CATEGORY, t.REMOVE_CATEGORY, t.UPDATE_CATEGORY]);