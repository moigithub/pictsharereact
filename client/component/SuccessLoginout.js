import React, {Component, PropTypes} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';
import auth from '../auth';

export class SuccessLogin extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
            // request user data
            auth.login(function(){
                // redirect to /
                setTimeout( ()=>{browserHistory.push('/')} ,1500);
            });
    }
    
    render(){
        return (
            <div>
                <h1>You are logged in!</h1>
                <p>...redirecting to homepage</p>
            </div>
            );
    }
    
}

export class SuccessLogout extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
            // request user data
            auth.logout(function(){
                // redirect to /
                
                setTimeout( ()=>{browserHistory.push('/')} ,1500);
            });
    }
    
    render(){
        return (
            <div>
                <h1>Thanks for playing with us!</h1>
                <p>...redirecting to homepage</p>
            </div>
            );
    }
    
}