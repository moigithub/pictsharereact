'use strict';
import React, {Component} from 'react';
import {   browserHistory } from 'react-router';
//import {connect} from 'react-redux';
import  * as auth from '../clientAuth';

export default class SuccessLogin extends Component {
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

