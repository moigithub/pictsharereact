import React, {Component} from 'react';
import { browserHistory} from 'react-router';
//import {connect} from 'react-redux';
import  * as auth from '../clientAuth';

export default class SuccessLogout extends Component {
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
