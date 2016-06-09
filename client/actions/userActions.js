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

export function SetUserAsync(cb) {
    console.log("SetUserAsync");
    return function(dispatch){
        /// http request

        $.get("/api/users/")
            .done((data)=>{
                localStorage.user = data.twitter;
                localStorage.token = data._id;
                localStorage.userData = JSON.stringify(data);
                
                console.log("success",data);
                dispatch(SetUser(data));
                
                if(cb) cb();
            })
            .fail(function(err){
                console.error("error",err);
//                toastr.error('Error: '+err);
            });
    };

}


export function ClearUserAsync(cb) {
    console.log("ClearUserAsync");
    return function(dispatch){
        /// http request
        $.get("/auth/logout")
            .done((data)=>{
                delete localStorage.token;
                delete localStorage.user;
                delete localStorage.userData;
                
                dispatch(ClearUser());
                
                if(cb) cb();
            })
            .fail(function() {
                console.error( "auth/logout error getting api/votes data" );
            });        
    };
};


