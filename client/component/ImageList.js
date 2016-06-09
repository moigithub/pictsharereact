import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/imageActions';

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
        const {title, imageURL, likesCount, onDelete, onLikeClick, onDisLikeClick} = this.props;
        const NO_IMAGE_URL= 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
        return(
            <div className ="ImageBox">
                <button className="btn btn-danger deleteBtn" onClick={onDelete}>X</button>
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
    likesCount: PropTypes.func, 
    onDelete: PropTypes.func, 
    onLikeClick: PropTypes.func, 
    onDisLikeClick: PropTypes.func
};

class ImageList extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <div>
                {this.props.images.map((img,i)=><Image key={i} {...img} 
                            onDelete={()=>this.props.removeImage(img)} 
                            onLikeClick={()=>this.props.likesInc(img)}
                            onDisLikeClick={()=>this.props.likesDec(img)}
                            />)
                    
                }
            </div>
        );
    }
}
ImageList.propTypes ={
    images: PropTypes.array,
    removeImage: PropTypes.func,
    likesInc: PropTypes.func,
    likesDec: PropTypes.func
};

function mapStateToProps(state, ownProps){
    return {
        images: state.images
    };
}
function mapDispatchToProps(dispatch){
    return {
        removeImage: image=>dispatch(actions.RemoveImage(image)),
        likesInc: image=>dispatch(actions.LikeInc(image)),
        likesDec: image=>dispatch(actions.LikeDec(image))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);