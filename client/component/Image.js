'use strict';

import React, {Component, PropTypes} from 'react';

export default class Image extends Component {
    constructor(props) {
        super(props);
        
        this.state = { imageOk : true};
        this.brokenImage=this.brokenImage.bind(this);
    }
    
    brokenImage(){
        this.setState({imageOk: false});
    }
    
    render(){
        const {user, userId, title, imageURL, likesCount, onDelete, onLikeClick, onDisLikeClick} = this.props;
        const NO_IMAGE_URL= 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
        const showButton = user && user.userId==userId ;
        return(
            <div className ="ImageBox grid-item">
           
                {showButton && <button className="btn btn-danger deleteBtn" onClick={onDelete}><i className="fa fa-trash-o" aria-hidden="true"></i></button>}
                <div className="img-container">
                {this.state.imageOk ?
                    <img src={imageURL} className="img-responsive" onError={this.brokenImage} />
                :
                    <img src={NO_IMAGE_URL} className="img-responsive" />
                }
                </div>
                <div className="ImageTitle">{title}</div>
                <div className="likeBtns">
                    <button className="LikeBtnUp btn btn-info" onClick={onLikeClick}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
                    <button className="LikeBtnDown btn btn-info" onClick={onDisLikeClick}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
                    <span className="LikeCount">{likesCount}</span>
                </div>
          
            </div>
        );
    }
}
Image.propTypes ={
    user: PropTypes.object, 
    userId: PropTypes.string, 
    title: PropTypes.string, 
    imageURL: PropTypes.string, 
    likesCount: PropTypes.number, 
    onDelete: PropTypes.func, 
    onLikeClick: PropTypes.func, 
    onDisLikeClick: PropTypes.func
};
