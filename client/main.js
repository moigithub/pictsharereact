'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,  browserHistory, IndexRoute, Redirect} from 'react-router';


// const Provider = require('react-redux').Provider
import { Provider } from 'react-redux';
import {getImagesFromServer} from './actions/imageActions';

import * as auth from './auth';

// import $ from 'jquery';
var $ = require("jquery");

//require('es6-promise').polyfill();
//import fetch from 'isomorphic-fetch'


require("./styles.css");


import ImageList from './component/ImageList';
import SuccessLogin from './component/SuccessLogin';
import SuccessLogout from './component/SuccessLogout';
import Main from './component/Main';
import configureStore from './Store';
///////////


///// STORE ///

const initialState = {
    images:[
 //       {_id:1, title:'mono', imageURL:'http://i2.asntown.net/ha/Animals/finger-monkey/finger_monkeys_640_04.jpg', likesCount:4, userId:1},
 //       {_id:2, title:'i dun care', imageURL:'https://s-media-cache-ak0.pinimg.com/236x/04/0b/aa/040baad9f12d5fa530a833055cb8647b.jpg', likesCount:9, userId:1}
        ]
};

const Store = configureStore();
// dispatch to get initial data from server
Store.dispatch(getImagesFromServer());


/// FIN STORE ////



function requireAuth(nextState, replace) {
    console.log("route requireauth",Store.getState());
  if (!auth.isLoggedIn()) {
      /*
    replace({
      pathname: '/auth/twitter' // only work if auth/twiter if part of <Route> list
    })
    */
    window.location = "/";
    //alert("not logged");
    
    
    //router.replace({ pathname, query, state }) // new "location descriptor"
     
  }
}


/////////////
ReactDOM.render((
<Provider store={Store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
        <IndexRoute  component={ImageList}/>
        <Route path="Picts/(:filter)" component={ImageList}  onEnter={requireAuth} />

        <Route path="successLogin" component={SuccessLogin} />
        <Route path="successLogout" component={SuccessLogout} />
        
        
        <Redirect from="*" to="/" />
    </Route>
  </Router>
</Provider>  
), document.getElementById("app"));