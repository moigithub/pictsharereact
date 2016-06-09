import React, {Component, PropTypes} from 'react';
import NavBar from './NavBar';
import ImageForm from './ImageForm';

import {connect} from 'react-redux';

class Main extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {user}=this.props;
        console.log("Main render",this.props);
        let data = {
            user: user.twitter,
            logged : !!user._id
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

function mapStateToProps(state, ownProps){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Main);
