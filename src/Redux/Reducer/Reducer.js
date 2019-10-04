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
            return []
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

export default combineReducers({ user, quizName, quizType, question, answers, questions })