import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as imageActions from '../actions/imageActions';

class Image extends Component {
    constructor(props) {
        super(props);
        
        this.state = { imageOk : true};
        this.brokenImage=this.brokenImage.bind(this);
    }
    
    brokenImage(){
        this.setState({imageOk: false});
    }
    
    render(){
        const {title, imageURL, likesCount, onDelete, onLikeClick, onDisLikeClick, showDeleteButton} = this.props;
        const NO_IMAGE_URL= 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
        return(
            <div className ="ImageBox">
                {showDeleteButton && <button className="btn btn-danger deleteBtn" onClick={onDelete}>X</button>}
                {this.state.imageOk ?
                    <img src={imageURL} className="img-responsive" onError={this.brokenImage} />
                :
                    <img src={NO_IMAGE_URL} className="img-responsive" />
                }
                <div className="ImageTitle">{title}</div>
                <div className="likeBtns">
                    <button className="LikeBtnUp btn btn-info" onClick={onLikeClick}>+1</button>
                    <span className="LikeCount">{likesCount}</span>
                    <button className="LikeBtnDown btn btn-info" onClick={onDisLikeClick}>-1</button>
                </div>
            </div>
        );
    }
}
Image.propTypes ={
    title: PropTypes.string, 
    imageURL: PropTypes.string, 
    likesCount: PropTypes.number, 
    onDelete: PropTypes.func, 
    onLikeClick: PropTypes.func, 
    onDisLikeClick: PropTypes.func,
    showDeleteButton: PropTypes.bool
};

class ImageList extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        const {removeImage, likesInc, likesDec, user, images} = this.props;
        return (
            <div>
                {images.map((img,i)=><Image key={i} {...img} 
                            onDelete={()=>removeImage(img)} 
                            onLikeClick={()=>likesInc(img)}
                            onDisLikeClick={()=>likesDec(img)}
                            showDeleteButton={!!user}
                            />)
                    
                }
            </div>
        );
    }
}
ImageList.propTypes ={
    images: PropTypes.array,
    user: PropTypes.object,
    removeImage: PropTypes.func,
    likesInc: PropTypes.func,
    likesDec: PropTypes.func
};

function mapStateToProps(state, ownProps){
    return {
        images: state.images,
        user: state.user
    };
}
function mapDispatchToProps(dispatch){
    return {
        removeImage: image=>dispatch(imageActions.RemoveImageAsync(image)),
        likesInc: image=>dispatch(imageActions.LikeInc(image)),
        likesDec: image=>dispatch(imageActions.LikeDec(image))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);