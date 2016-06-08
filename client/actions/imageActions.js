import { ADD_IMAGE,
     REMOVE_IMAGE,
     LIKE_INC }
     from './actionConstants';

export const addImage=(image)=>{
    return {type: ADD_IMAGE, payload:image};
};

export function removeImage(image){
    return {type: REMOVE_IMAGE, payload:image};
};

export const likeInc=(image)=>{
    return {type: LIKE_INC, payload:image};
};