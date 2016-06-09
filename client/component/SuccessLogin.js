import React, {Component, PropTypes} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';
import {connect} from 'react-redux';
import * as userActions from '../actions/userActions';

class SuccessLogin extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
            // request user data
            this.props.login(function(){
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
SuccessLogin.propTypes ={
    login: PropTypes.func
};


function mapStateToProps(state, ownProps){
    return {
        user: state.user
    };
}
function mapDispatchToProps(dispatch){
    return {
        login: ()=>dispatch(userActions.SetUserAsync())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessLogin);
