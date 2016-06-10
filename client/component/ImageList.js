import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as imageActions from '../actions/imageActions';
import auth from '../auth';

//////////
var Masonry = require('react-masonry-component');
// init Masonry

var masonryOptions= {
  // options...
  //itemSelector: '.grid-item',
  //columnWidth: 200,
  transitionDuration: 1,
  isAnimated: true,
  animationOptions: {
    duration: 750,
    easing: 'linear',
    queue: false
  }
  
};


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

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
        
        
    }
/*    
    masonry={};

    handleImagesLoaded(imagesLoadedInstance) {
        //console.log("instance",imagesLoadedInstance);
        imagesLoadedInstance.jqDeferred.progress( function(instance, image){
            var result = image.isLoaded ? 'loaded' : 'broken';
           // console.log( 'image is ' + result + ' for ' + image.img.src);
            
            //jquery 
            var image = $(image.img)
                    .addClass("animate tada");

                // Find and show the item.
                var item = image
                    .parents(".grid-item")
                    .show();

                // Lay out Masonry.
                //console.log("yoyo",this.masonry);
        });
    }
*/ 
    render(){
        const {removeImage, likesInc, likesDec, user, images} = this.props;
        //console.log("imagelist props",this.props);
        return (
            <div className="grid">
                 <Masonry
                    className={'masonry'} // default '' 
                    elementType={'div'} // default 'div' 
                    options={masonryOptions} // default {} 
                    disableImagesLoaded={false} // default false 
                    //onImagesLoaded={this.handleImagesLoaded}
                >
                    {images.map((img,i)=><Image key={i} {...img} 
                                onDelete={()=>removeImage(img)} 
                                onLikeClick={()=>likesInc(img)}
                                onDisLikeClick={()=>likesDec(img)}
                                user={user}
                                />)
                        
                    }
                </Masonry>
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
    //console.log("filter form imagelist withRouter", filter, images , uid);
    if(filter.toLowerCase()=="me"){ return images.filter(img=>img.userId===uid); }
    return images;
}

function mapStateToProps(state, ownProps){
    //console.log("imagelist mapState2Props ownProps", ownProps,auth.getCurrentUser());
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