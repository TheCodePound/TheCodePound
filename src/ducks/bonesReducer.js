const initialBones = {
    bones: 0,
  }
  
  const USER_BONES = "USER_BONES"
  
  export function userBones(bones) {

    return {
    type: USER_BONES,
    payload: bones,
    }
  }
  
  export default function(state = initialBones, action) {
    switch (action.type) {
      case USER_BONES:
        return {...state, bones: action.payload}
      default:
        return state
    }
  }
  