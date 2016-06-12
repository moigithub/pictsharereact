'use strict';
import { ADD_IMAGE,
     REMOVE_IMAGE,
     UPDATE_IMAGE,
     LIKE_INC,
     LIKE_DEC }
     from '../actions/actionConstants';
     

export default function imageReducer(state=[], action){
    //console.log("*********img reducer***********",action);
    switch(action.type){
        case ADD_IMAGE:
            
            return [...state, action.image];
        case REMOVE_IMAGE:
            //console.log("reducer img", action,"state" ,state);
            return state.filter(image=>{ return image._id!==action.image._id; } );
        case UPDATE_IMAGE:
            return state.map(image=>{
                    if(image._id==action.image._id){
                        return action.image;
                    }
                    return image;
                });
        case LIKE_INC:
            /*
            return [...state.filter(image=>image._id!==action.image._id), 
                Object.assign({}, action.image, {likesCount: ++action.image.likesCount})
                ];
            */
            return state.map(image=>{
                    if(image._id==action.image._id){
                        return Object.assign({}, action.image, {likesCount: ++action.image.likesCount});
                    }
                    return image;
                });
        case LIKE_DEC:
            return state.map(image=>{
                    if(image._id==action.image._id){
                        return Object.assign({}, action.image, {likesCount: --action.image.likesCount});
                    }
                    return image;
                });
    }
    return state;
}

