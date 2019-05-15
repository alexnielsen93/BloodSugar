const initialState ={
  user_id: null,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  bloodSugarReadings: [],
  reading_date: '',
  phone_number: ''


}
 const UPDATE_USER_ID = 'UPDATE_USER_ID'
 const UPDATE_USERNAME = 'UPDATE_USER_NAME'
 const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'
 const LOGOUT = 'LOGOUT'
 const UPDATE_BLOOD_SUGAR = 'UPDATE_BLOOD_SUGAR'
 const UPDATE_DAY = 'UPDATE_DAY'
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

 export function updateBloodSugar(bloodSugarReadings){
  return{
    type: UPDATE_BLOOD_SUGAR,
    payload: bloodSugarReadings
  }
 }

 export function updateDay(day){
   return{
     type:UPDATE_DAY,
     payload: day
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
  const  { first_name,last_name, email, password, username} = payload
  return {...state, first_name, last_name, email, password,username}
  case LOGOUT:
  return {...state, user_id: '', username: '', first_name: '', last_name: '', email: '', bloodSugarReadings: [], reading_date: ''}
  case UPDATE_BLOOD_SUGAR:
  console.log('REDUCER',payload)
  return {...state, bloodSugarReadings:payload}
  case UPDATE_DAY:
  return {...state, reading_date: payload}
  default: return state
}

}