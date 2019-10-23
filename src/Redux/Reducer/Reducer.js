import { combineReducers } from 'redux'
const user = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state;
    }
}

const quizName = (state = '', action) => {
    switch (action.type) {
        case 'SET_QUIZ_NAME':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const quizImg = (state = '', action) => {
    switch (action.type) {
        case 'SET_QUIZ_IMG':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const is_private = (state = false, action) => {
    switch (action.type) {
        case 'SET_IS_PRIVATE':
            return action.payload
        case 'SUBMIT':
            return false
        default:
            return state
    }
}

const genre_id = (state = '', action) => {
    switch (action.type) {
        case 'SET_GENRE_ID':
            return action.payload
        default:
            return state
    }
}

const question_type_id = (state = '', action) => {
    switch (action.type) {
        case 'SET_QUESTION_GENRE_ID':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const question = (state = '', action) => {
    switch (action.type) {
        case 'SET_QUESTION':
            return action.payload
        case 'SET_QUESTIONS':
        case 'UNSET_EDIT':
            return ''
        case 'SET_EDIT':
            return action.payload.question
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const answers = (state = [], action) => {
    switch (action.type) {
        case 'SET_ANSWERS':
            return action.payload
        case 'SET_QUESTIONS':
        case 'UNSET_EDIT':
            return []
        case 'SET_EDIT':
            return action.payload.answers
        case 'SUBMIT':
            return []
        default:
            return state
    }
}

const edit = (state = 0, action) => {
    switch (action.type) {
        case 'SET_EDIT':
            return action.payload.id
        case 'UNSET_EDIT':
            return 0
        case 'SUBMIT':
            return 0
        default:
            return state
    }
}

const questions = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return action.payload
        case 'SUBMIT':
            return []
        default:
            return state
    }
}

export default combineReducers({ user, quizName, quizImg, is_private, genre_id, question_type_id, question, answers, questions, edit })