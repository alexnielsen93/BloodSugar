const initialState ={
  user_id: null,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  bloodSugarReadings: []


}

export default function reducer(state = initialState, action){
const { type, payload} = action
switch(type){

  default: return state
}

}