import { ADD_IMAGE,
     REMOVE_IMAGE,
     LIKE_INC,
     LIKE_DEC }
     from '../actions/actionConstants';
     
import { AddImage, RemoveImage, LikeInc } from '../actions/imageActions';


export default function imageReducer(state=[], action){
    console.log("*********img reducer***********",action.type);
    switch(action.type){
        case ADD_IMAGE:
            
            return [...state, action.image];
        case REMOVE_IMAGE:
            console.log("reducer img", action,"state" ,state);
            return state.filter(image=>image._id!==action.image._id);
        case LIKE_INC:
            return [...state.filter(image=>image._id!==action.image._id), 
                Object.assign({}, action.image, {likesCount: ++action.image.likesCount})
                ];
        case LIKE_DEC:
            return [...state.filter(image=>image._id!==action.image._id), 
                Object.assign({}, action.image, {likesCount: --action.image.likesCount})
                ];
    }
    return state;
};

