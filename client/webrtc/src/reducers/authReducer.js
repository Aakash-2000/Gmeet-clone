const initialState={
    user:null
};
const authreducer =(state=initialState,action)=>{
    switch(action.type){
        case "USER_DETAILS":
            return{
                ...state,
                user:action.details
                
            };
        
        case "ROOM_ID":
            
            return{  
                ...state,
                user:action.details 
            };
        
        default:
            return{
                ...state
            }
    }
}
export default authreducer;