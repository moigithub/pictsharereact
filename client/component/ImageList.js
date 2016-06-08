import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

const Image = ({title, imageURL, likesCount, onDelete})=>(
    <div className ="ImageBox">
        <button className="btn btn-danger" onClick={onDelete}>X</button>
        <img src={imageURL} className="img-responsive" />
        <div className="ImageTitle">{title}</div>
        <button className="LikeBtn">{likesCount}</button>
    </div>
);

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.deleteImage=this.deleteImage.bind(this);
    }
    
    deleteImage(){
        alert("beep");
    }
    
    render(){
        return (
            <div>
                {this.props.images.map((img,i)=><Image key={i} {...img} onDelete={this.deleteImage}/>)}
            </div>
        );
    }
}
ImageList.propTypes ={
    images: PropTypes.Array,
    deleteImage: PropTypes.func
};

function mapStateToProps(state){
    return {
        images: state.images
    };
}

export default connect(mapStateToProps)(ImageList);