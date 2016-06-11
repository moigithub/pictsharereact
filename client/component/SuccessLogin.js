import React, {Component, PropTypes} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';
import {connect} from 'react-redux';
import  * as auth from '../auth';

export default class SuccessLogin extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
        
            // request user data
            auth.login(function(){
                // redirect to /
                
                setTimeout( browserHistory.push('/') ,1000);
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


/*
function mapDispatchToProps(dispatch){
    return {
        login: (cb)=>dispatch(userActions.SetUserAsync(cb))
    };
}
*/
//// version reducida de mapDispatchToProps, los parametros se pasan en el mismo orden

