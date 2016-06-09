export default function user(state={}, action){
    console.log("*************user *******",action.type);
    switch(action.type){
        case 'SET_USER':
            return action.user;
        case 'CLEAR_USER':
            return {};
            
    }
    return state;
}

