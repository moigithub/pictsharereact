'use strict';
import { ADD_IMAGE,
     REMOVE_IMAGE,
     UPDATE_IMAGE,
     LIKE_INC,
     LIKE_DEC
     }
     from './actionConstants';

import toastr from 'toastr';

export const AddImage=(image)=>{
    return {type: ADD_IMAGE, image:image};
};

export function RemoveImage(image){
    return {type: REMOVE_IMAGE, image:image};
}

export const UpdateImage=(image)=>{
    return {type: UPDATE_IMAGE, image:image};
};

export const LikeInc=(image)=>{
    return {type: LIKE_INC, image:image};
};

export const LikeDec=(image)=>{
    return {type: LIKE_DEC, image:image};
};

///////////////////////////////////////////////////////////////////////////////
/// async actions
///////////////////////////////////////////////////////////////////////////////
export function getImagesFromServer() {
    //console.log("getImagesFromServer");
    return function(dispatch){
        /// http request
        var API_URL ="/api/images";

        $.ajax({
            url:`${API_URL}`,
            method:"GET",
            dataType: 'json'  // response from server should be object
        //    headers: { "Authorization": user.tk },
        })
            .done(function(data){
                //console.log("success",data);
                data.forEach(function(image){
                    dispatch(AddImage(image));
                });
            })
            .fail(function(err){
                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}

export function AddImageAsync(image) {
    //console.log("addimageasync",image);
    return function(dispatch){
        /// http request
        var API_URL ="/api/images";

        $.ajax({
            url:`${API_URL}`,
            method:"POST",
            data: image,
        //    contentType: "application/json; charset=utf-8",
        //    processData :false,        // when true (by default) process data as form encoded
            dataType: 'json'  // response from server should be object
        //    headers: { "Authorization": user.tk },
        })
            .done(function(data){
                //console.log("success",data);
                dispatch(AddImage(data));
                toastr.info(image.title + ' added');
            })
            .fail(function(err){
                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}

export function RemoveImageAsync(image) {
    //console.log("remove imageasync",image);
    return function(dispatch){
        /// http request
        

        $.ajax({
            url:`/api/images/${image._id}`,
            method:"DELETE",
            data: image,
        //    contentType: "application/json; charset=utf-8",
        //    processData :false,        // when true (by default) process data as form encoded
            dataType: 'json'  // response from server should be object
        //    headers: { "Authorization": user.tk },
        })
            .done(function(data){
                //console.log("success",data);
                dispatch(RemoveImage(image));
                toastr.info(image.title + ' removed');
            })
            .fail(function(err){
                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}


function serverUpdate(id, image){
    return $.ajax({
        url:`/api/images/${id}`,
        method:"PUT",
        data: image,
    //    contentType: "application/json; charset=utf-8",
    //    processData :false,        // when true (by default) process data as form encoded
        dataType: 'json'  // response from server should be object
    //    headers: { "Authorization": user.tk },
    });
}
export function LikeIncAsync(image) {
    //console.log("remove imageasync",image);
    return function(dispatch){
        /// http request
        
            serverUpdate(image._id, Object.assign({}, image, {likesCount: ++image.likesCount}))
            .done(function(data){
                //console.log("success",data);
                dispatch(UpdateImage(data));
            })
            .fail(function(err){
                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}
export function LikeDecAsync(image) {
    //console.log("remove imageasync",image);
    return function(dispatch){
        /// http request
            serverUpdate(image._id, Object.assign({}, image, {likesCount: --image.likesCount}))
            .done(function(data){
                //console.log("success",data);
                dispatch(UpdateImage(data));
            })
            .fail(function(err){
                console.error("error",err);
                toastr.error('Error: '+err);
            });
    };

}
