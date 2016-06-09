
import { ADD_IMAGE,
     REMOVE_IMAGE,
     LIKE_INC,
     LIKE_DEC
     }
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

///////////////////////////////////////////////////////////////////////////////
/// async actions
///////////////////////////////////////////////////////////////////////////////

export function AddImageAsync(image) {
    console.log("addimageasync",image);
    return function(dispatch){
        /// http request
        var API_URL ="/api/images";

        $.ajax({
            url:`${API_URL}`,
            method:"POST",
            data: image,
        //    contentType: "application/json; charset=utf-8",
        //    processData :false,        // when true (by default) process data as form encoded
            dataType: 'json',  // response from server should be object
        //    headers: { "Authorization": user.tk },
        })
            .done(function(data){
                console.log("success",data);
                dispatch(AddImage(data));
            })
            .fail(function(err){
                console.error("error",err);
//                toastr.error('Error: '+err);
            });
    };

}
