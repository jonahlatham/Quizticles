import { combineReducers } from 'redux'
const user = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        default:
            return state;
    }
}

const quizName = (state = '', action) => {
    switch (action.type) {
        case 'SET_QUIZ_NAME':
            return action.payload
        default:
            return state
    }
}

const quizType = (state = '', action) => {
    switch (action.type) {
        case 'SET_QUIZ_TYPE':
            return action.payload
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
        default:
            return state
    }
}

const questions = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return action.payload
        default:
            return state
    }
}

export default combineReducers({ user, quizName, quizType, question, answers, questions, edit })