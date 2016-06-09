import {SET_USER, CLEAR_USER} from './actionConstants';

export const SetUser=(user)=>{
    return {type: SET_USER, user: user};
};

export const ClearUser = ()=>{
    return {type: CLEAR_USER, user:{}};
};



// creo q es lo mismo q auth.js

///////////////////////////////////////////////////////////////////////////////
/// async actions
///////////////////////////////////////////////////////////////////////////////

export function SetUserAsync(user) {
    console.log("SetUserAsync",user);
    return function(dispatch){
        /// http request


            .done(function(data){
                console.log("success",data);
                dispatch(SetUser(data));
            })
            .fail(function(err){
                console.error("error",err);
//                toastr.error('Error: '+err);
            });
    };

}
