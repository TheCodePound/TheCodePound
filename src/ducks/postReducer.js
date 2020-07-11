const initialState = {
    posts: []
}

const GET_POSTS = 'GET_POSTS'

export function getPosts(data) {
    return {
        type: GET_POSTS,
        payload: data
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            return {...state, posts: action.payload}
        default:
            return state
    }
}