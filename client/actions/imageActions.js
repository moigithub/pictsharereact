import { ADD_IMAGE,
     REMOVE_IMAGE,
     LIKE_INC }
     from './actionConstants';

export const AddImage=(image)=>{
    return {type: ADD_IMAGE, payload:image};
};

export function RemoveImage(image){
    return {type: REMOVE_IMAGE, payload:image};
};

export const LikeInc=(image)=>{
    return {type: LIKE_INC, payload:image};
};