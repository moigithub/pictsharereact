'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {RemoveImageAsync, LikeIncAsync, LikeDecAsync } from '../actions/imageActions.js';
//import * as auth from '../auth.js';
import {getCurrentUser} from '../clientAuth.js';
import Image from './Image.js';

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



export class ImageList extends Component {
    constructor(props) {
        super(props);
//        this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
        
        
    }

    render(){
        const {removeImage, likesInc, likesDec, user, images} = this.props;
        //console.log("imagelist props",this.props);
        return (
            <div>
                 <Masonry
                    className={'masonry'} 
                    elementType={'div'} 
                    options={masonryOptions}
                    disableImagesLoaded={false}
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
        images: filter(state.images, ownProps.params.filter || 'all', getCurrentUser().userId),
        user: getCurrentUser()
    };
}
function mapDispatchToProps(dispatch){
    return {
        removeImage: image=>dispatch(RemoveImageAsync(image)),
        likesInc: image=>dispatch(LikeIncAsync(image)),
        likesDec: image=>dispatch(LikeDecAsync(image))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageList));

