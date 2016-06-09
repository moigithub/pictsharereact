import React, {Component, PropTypes} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect} from 'react-router';
import {connect} from 'react-redux';
import * as userActions from '../actions/userActions';

class SuccessLogout extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
        
            // request user data
            this.props.logout(function(){
                // redirect to /
                
                setTimeout( browserHistory.push('/') ,500);
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
SuccessLogout.propTypes ={
    logout: PropTypes.func
};



function mapStateToProps(state, ownProps){
    return {
        user: state.user
    };
}
function mapDispatchToProps(dispatch){
    return {
        logout: (cb)=>dispatch(userActions.ClearUserAsync(cb))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessLogout);