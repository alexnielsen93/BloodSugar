const initialState ={
  user_id: null,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  bloodSugarReadings: []


}
 const UPDATE_USER_ID = 'UPDATE_USER_ID'
 const UPDATE_USERNAME = 'UPDATE_USER_NAME'
 const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'
 const LOGOUT = 'LOGOUT'
 export function updateUserId (id){
   return{
     type: UPDATE_USER_ID,
     payload: id
   }
 }

 export function updateUsername(username){
   return{
     type: UPDATE_USERNAME,
     payload: username
   }
 }

 export function updateUserDetails(obj){
   return{
     type: UPDATE_USER_DETAILS,
     payload: obj
   }
 }

 export function logout(){
   return{
     type: LOGOUT
   }
 }

export default function reducer(state = initialState, action){
const { type, payload} = action
switch(type){
  case UPDATE_USER_ID:
  return{...state, user_id:payload}
  case UPDATE_USERNAME:
  return {...state, username:payload}
  case UPDATE_USER_DETAILS:
  const  { firstName,lastName, email, password, username} = payload
  return {...state, firstName, lastName, email, password,username}
  case LOGOUT:
  return {...state, user_id: '', username: '', firstName: '', lastName: '', email: '', bloodSugarReadings: []}
  default: return state
}

}