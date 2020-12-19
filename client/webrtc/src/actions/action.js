export const user_creation=(details)=>{
   return (dispatch,getState,{getFirebase,getFirestore})=>{
  
    dispatch({type:"USER_DETAILS",details})
       
   }
};
export const roomid=(id)=>{
   return (dispatch,getState,{getFirebase,getFirestore})=>{
   
    dispatch({type:"ROOM_ID",id})
       
   }
};