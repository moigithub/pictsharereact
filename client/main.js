'use strict';


import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';

import {createStore, combineReducers, applyMiddleware} from 'redux';
// const Provider = require('react-redux').Provider
import { Provider, connect } from 'react-redux';

// import $ from 'jquery';
//var $ = require("jquery");

//require('es6-promise').polyfill();
//import fetch from 'isomorphic-fetch'


require("./styles.css");

import ImageForm from './component/ImageForm';
import ImageList from './component/ImageList';

///////////
class Main extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            
            <div >
                <ImageForm/>
                {this.props.children}
            </div>
            );
    }
}
Main.contextTypes={
    store: React.PropTypes.object
};



///////////////
//// REDUCER
function images(state=[], action){
    switch(action.type){
        case 'ADD_IMAGE':
            return [...state, action.image];
            
    }
    return state;
}

function user(state={}, action){
    switch(action.type){
        case 'SET_USER':
            return action.user;
            
    }
    return state;
}

/////////////////
//////ACTION CREATOR

///// STORE ///
import thunk from 'redux-thunk';

const initialState = {
    images:[{title:'mono', imageURL:'http://i2.asntown.net/ha/Animals/finger-monkey/finger_monkeys_640_04.jpg', likesCount:4, userId:1}],
    user:{}
};
const createStoreWithThunk = applyMiddleware(thunk)(createStore);
const allReducers = combineReducers({images, user});
const Store = createStoreWithThunk(allReducers, initialState);
// dispatch to get initial data from server


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
  if (!Store.getState().user.userId) {
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
        <Route path="/images" component={ImageList}/>
        
    </Route>
  </Router>
</Provider>  
), document.getElementById("app"));