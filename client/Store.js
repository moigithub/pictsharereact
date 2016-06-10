'use strict';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import imageReducer from './reducers/imageReducer';


export default function configureStore(initialState){
    const createStoreWithThunk = applyMiddleware(thunk)(createStore);
    const allReducers = combineReducers({"images":imageReducer});
    return createStoreWithThunk(allReducers, initialState);
}


/*
const stockStore = createStore(
  handleStocks,
  initialState,
  applyMiddleware(
    thunk // lets us dispatch() functions
  )
)
*/