import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/imageActions';

const Image = ({title, imageURL, likesCount, onDelete, onLikeClick, onDisLikeClick})=>(
    <div className ="ImageBox">
        <button className="btn btn-danger deleteBtn" onClick={onDelete}>X</button>
        <img src={imageURL} className="img-responsive" />
        <div className="ImageTitle">{title}</div>
        <div className="likeBtns">
            <button className="LikeBtnUp btn btn-info" onClick={onLikeClick}>+1</button>
            <span className="LikeCount">{likesCount}</span>
            <button className="LikeBtnDown btn btn-info" onClick={onDisLikeClick}>-1</button>
        </div>
    </div>
);

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