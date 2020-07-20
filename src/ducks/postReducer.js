const initialState = {
    posts: []
}

const GET_POSTS = 'GET_POSTS'
const GET_BONES = 'GET_BONES'
const GET_COMMENTS = 'GET_COMMENTS'

export function getPosts(data) {
    return {
        type: GET_POSTS,
        payload: data
    }
}

export function getBones(data) {
    return {
        type: GET_BONES,
        payload: data
    }
}

export function getComments(data) {
    return {
        type: GET_COMMENTS,
        payload: data
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            return {...state, posts: action.payload}
        case GET_BONES:
            return {...state, posts: action.payload}
        case GET_COMMENTS:
            return {...state, posts: action.payload}
        default:
            return state
    }
}