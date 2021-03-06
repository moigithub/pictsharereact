'use strict';
import React, {Component, PropTypes} from 'react';
import NavBar from './NavBar';
import ImageForm from './ImageForm';

//import {connect} from 'react-redux';
import  * as auth from '../clientAuth';


export default class Main extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        //// sync user logged
        auth.syncUserStatus();
    }
    
    render(){
        //console.log("Main render",this.props);
        
        //todo pull data from localStorage
        let data = {
            user: auth.getCurrentUser(),
            logged : auth.isLoggedIn()
        };
        return (
            
            <div >
                <NavBar {...data}/>
                <div className="container">
                    {data.logged && <ImageForm/>}
                    {this.props.children}
                </div>
            </div>
            );
    }
}
Main.propTypes={
    children: PropTypes.element,
    user: PropTypes.object
};



