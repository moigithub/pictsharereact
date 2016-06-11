'use strict';
/*global localStorage*/
import {  browserHistory } from 'react-router';

var user = {};  // is stored on client, so not affecting multiple users from diff part of world


export const login =function(cb){
    $.get("/api/users/")
        .done((data)=>{
            user = data.twitter;
            user.userId = data._id;
            localStorage.token = data._id;
            localStorage.userData = JSON.stringify(user);
           // console.log("auth login",user);
            //this.setState({user: JSON.stringify(data)});
            
            if(cb) cb();
        })
        .fail(function() {
            console.error( "users/ error getting api/votes data" );
            user = {};
        });
    
};
    
export const logout=function(cb){
    $.get("/auth/logout")
        .done((data)=>{
            user={};
            delete localStorage.token;
            delete localStorage.userData;
        //    console.log("auth logged out");
            if(cb) cb();
        })
        .fail(function() {
            console.error( "auth/logout error getting api/votes data" );
        });        
};
    
export const getCurrentUser=function(){
    user = JSON.parse(localStorage.userData||"{}");
    return user;
    // deberia recuperar data from localStorage, to prevent lost when refresh
};

export const isLoggedIn=function(){
    return !!localStorage.token;
    /*;
    $.get("/api/users/isLogged")
        .done((data)=>{
            this.setState({status:data});
        })
        .fail(function() {
            console.error( "isLogged error getting api/votes data" );
        });
    
*/
};
    
export const syncUserStatus=function(cb){
    var currentStatus = isLoggedIn();
    
    $.get("/api/users/isLogged")
        .done((data)=>{
            // if on server is logged in.. but not on client...
            if (!currentStatus) {
                browserHistory.push('/successLogin');
            }
        })
        .fail(function() {
            // if on server is NOT logged in.. but on client...
            if (currentStatus) {
                browserHistory.push('/successLogout');
            }
        });
};



/*
localStorage.colorSetting = '#a4509b';
localStorage['colorSetting'] = '#a4509b';
localStorage.setItem('colorSetting', '#a4509b');

localStorage.getItem('bgcolor')

	storage.removeItem(x);
*/