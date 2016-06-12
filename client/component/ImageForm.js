'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/imageActions';
import * as auth from '../clientAuth';

class ImageForm extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    handleSubmit(e){
        e.preventDefault();
        var imageData = {
            title: this.refs.title.value, 
            imageURL: this.refs.imageurl.value, 
            likesCount:0,
            userId:this.props.user.userId
        };
        console.log("submit",imageData);
        this.props.addImage(imageData);
        
        //clear input box
        this.refs.title.value=""; 
        this.refs.imageurl.value=""; 

    }
    
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" ref="title" name="title" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Image Link</label>
                        <input type="text" ref="imageurl" name="imageurl" className="form-control"/>
                    </div>
                    <button className="btn btn-Primary">Submit</button>
                </form>
            </div>
        );
    }
}
ImageForm.propTypes ={
    images: PropTypes.array,
    user: PropTypes.object,
    addImage: PropTypes.func
};

function mapStateToProps(state){
    return {images:state.images, user:auth.getCurrentUser()};
}
function mapDispatchToProps(dispatch){
    return {
        addImage: (image)=>{dispatch(actions.AddImageAsync(image));}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);