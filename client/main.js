'use strict';


import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';

import {createStore, combineReducers, applyMiddleware} from 'redux';
// const Provider = require('react-redux').Provider
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import imageReducer from './reducers/imageReducer';
import userReducer from './reducers/userReducer';
import {getImagesFromServer} from './actions/imageActions';

// import $ from 'jquery';
//var $ = require("jquery");

//require('es6-promise').polyfill();
//import fetch from 'isomorphic-fetch'


require("./styles.css");


import ImageList from './component/ImageList';
import SuccessLogin from './component/SuccessLogin';
import SuccessLogout from './component/SuccessLogout';
import Main from './component/Main';

///////////




///////////////
//// REDUCER


/////////////////
//////ACTION CREATOR

///// STORE ///


const initialState = {
    images:[
 //       {_id:1, title:'mono', imageURL:'http://i2.asntown.net/ha/Animals/finger-monkey/finger_monkeys_640_04.jpg', likesCount:4, userId:1},
 //       {_id:2, title:'i dun care', imageURL:'https://s-media-cache-ak0.pinimg.com/236x/04/0b/aa/040baad9f12d5fa530a833055cb8647b.jpg', likesCount:9, userId:1}
        ],
    user:{}
};
const createStoreWithThunk = applyMiddleware(thunk)(createStore);
const allReducers = combineReducers({"images":imageReducer, "user":userReducer});
const Store = createStoreWithThunk(allReducers, initialState);
// dispatch to get initial data from server
Store.dispatch(getImagesFromServer());

/*
const stockStore = createStore(
  handleStocks,
  initialState,
  applyMiddleware(
    thunk // lets us dispatch() functions
  )
)
*/
/// FIN STORE ////

function requireAuth(nextState, replace) {
    //console.log(nextState.location);
  if (!nextState.user._id) {
      /*
    replace({
      pathname: '/auth/twitter' // only work if auth/twiter if part of <Route> list
    })
    */
    window.location = "/";
    
    
    //router.replace({ pathname, query, state }) // new "location descriptor"
     
  }
}

ReactDOM.render((
<Provider store={Store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
        <IndexRoute  component={ImageList}/>
        <Route path="Picts/Me" component={ImageList}  onEnter={requireAuth} />
        
        <Route path="successLogin" component={SuccessLogin} />
        <Route path="successLogout" component={SuccessLogout} />
        
        
        <Redirect from="*" to="/" />
    </Route>
  </Router>
</Provider>  
), document.getElementById("app"));