
import thunk from 'redux-thunk';

import { ADD_IMAGE,
     REMOVE_IMAGE,
     LIKE_INC,
     LIKE_DEC }
     from './actionConstants';

export const AddImage=(image)=>{
    return {type: ADD_IMAGE, image:image};
};

export function RemoveImage(image){
    return {type: REMOVE_IMAGE, image:image};
};

export const LikeInc=(image)=>{
    return {type: LIKE_INC, image:image};
};

export const LikeDec=(image)=>{
    return {type: LIKE_DEC, image:image};
};
/// async actions
