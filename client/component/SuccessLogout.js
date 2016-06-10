import React, {Component, PropTypes} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';
import {connect} from 'react-redux';
import auth from '../auth';

export default class SuccessLogout extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
        
            // request user data
            auth.logout(function(){
                // redirect to /
                
                setTimeout( browserHistory.push('/') ,100);
            });
    }
    
    render(){
        return (
            <div>
                <p>...redirecting to homepage</p>
            </div>
            );
    }
    
}
