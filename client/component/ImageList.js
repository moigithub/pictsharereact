import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as imageActions from '../actions/imageActions';
import auth from '../auth';

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
        const {user, userId, title, imageURL, likesCount, onDelete, onLikeClick, onDisLikeClick} = this.props;
        const NO_IMAGE_URL= 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
        const showButton = user && user.userId==userId ;
        return(
            <div className ="ImageBox">
                {showButton && <button className="btn btn-danger deleteBtn" onClick={onDelete}>X</button>}
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
    user: PropTypes.object, 
    userId: PropTypes.string, 
    title: PropTypes.string, 
    imageURL: PropTypes.string, 
    likesCount: PropTypes.number, 
    onDelete: PropTypes.func, 
    onLikeClick: PropTypes.func, 
    onDisLikeClick: PropTypes.func
};

class ImageList extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        const {removeImage, likesInc, likesDec, user, images} = this.props;
        //console.log("imagelist props",this.props);
        return (
            <div>
                {images.map((img,i)=><Image key={i} {...img} 
                            onDelete={()=>removeImage(img)} 
                            onLikeClick={()=>likesInc(img)}
                            onDisLikeClick={()=>likesDec(img)}
                            user={user}
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

function filter(images, filter, uid){
    console.log("filter form imagelist withRouter", filter, images , uid);
    if(filter.toLowerCase()=="me"){ return images.filter(img=>img.userId===uid); }
    return images;
}

function mapStateToProps(state, ownProps){
    console.log("mapState2Props ownProps", ownProps);
    return {
        images: filter(state.images, ownProps.params.filter || 'all', auth.getCurrentUser().userId),
        user: auth.getCurrentUser()
    };
}
function mapDispatchToProps(dispatch){
    return {
        removeImage: image=>dispatch(imageActions.RemoveImageAsync(image)),
        likesInc: image=>dispatch(imageActions.LikeInc(image)),
        likesDec: image=>dispatch(imageActions.LikeDec(image))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageList));