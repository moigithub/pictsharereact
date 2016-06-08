import { ADD_IMAGE,
     REMOVE_IMAGE,
     LIKE_INC }
     from './actionConstants';
     
import { AddImage, RemoveImage, LikeInc } from '../actions/imageActions';

export const imageReducer = (state=[], action)=>{
    switch(action.type){
        case ADD_IMAGE:
            return [...state, action.payload];
        case REMOVE_IMAGE:
            return state.filter(image=>image._id!==action.payload.image._id);
        case LIKE_INC:
            return [...state.filter(image=>image._id!==action.payload.image._id), 
                Object.assign({}, action.payload, {likesCount: action.payload.likesCount++})
                ];
    }
    return state;
};

