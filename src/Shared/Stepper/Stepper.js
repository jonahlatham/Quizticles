import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Answer from './Answer/Answer'
import { connect } from 'react-redux';
import Question from './Question/Question';
import QuizName from './QuizSetUp/QuizName'
import QuizDisplayed from './QuizDisplayed/QuizDisplayed'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));




function getSteps() {
    return ['Quiz Name', 'Question', 'Answer', 'Review'];
}

function getStepContent(step, handleEditReview, props) {
    switch (step) {
        case 0:
            return (
                <div>
                    <QuizName history={props.history}/>
                </div>
            );
        case 1:
            return (
                <div>
                    <Question />
                </div>
            );
        case 2:
            return (
                <div>
                    <h2>Answer</h2>
                    <Answer />
                </div>
            );
        case 3:
            return (
                <div>
                    <QuizDisplayed handleEditReview={handleEditReview} />
                </div>
            )
        default:
            return 'Unknown step';
    }
}



function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const handleAddQustion = (event) => {
        props.dispatch({
            type: 'SET_QUESTIONS',
            payload: [...props.questions, { id: props.questions.length + 1, question: props.question, question_type_id: props.question_type_id, answers: props.answers }]
        })
    }

    const handleSaveQustion = (event) => {
        const editedQuestions = props.questions.map((e) => {
            if (props.edit === e.id) {
                e.question = props.question
                e.answers = props.answers
                e.question_type_id = props.question_type_id
            }
            return e
        })
        props.dispatch({
            type: 'SET_QUESTIONS',
            payload: editedQuestions
        });
        props.dispatch({
            type: 'UNSET_EDIT',
        })
    }

    const handleSubmitFinal = () => {
        debugger
        let body = {
        name: props.quizName,
        genre_id: props.genre_id,
        is_private: props.is_private,
        questions: props.questions
        }
        axios.post('/api/savedQuiz', body)
            .then((response)=>{
                if(response.data.success!==true){
                    props.history.push('/')
                }
            })
    }

    const handleEditReview = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 2)
    }
    const isStepAnswer = step => {
        return step === 2;
    };

    const isStepSkipped = step => {
        return skipped.has(step);
    };

    const handleReview = () => {
        handleNext()
        handleAddQustion()
    }

    const handleSave = () => {
        handleNext()
        handleSaveQustion()

    }

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleNewQuestion = () => {
        handleAddQustion()
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0); 
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <div className={classes.instructions}>
                            All steps completed - you&apos;re finished
            </div>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
            </Button>
                    </div>
                ) : (
                        <div>
                            <div className={classes.instructions}>{getStepContent(activeStep, handleEditReview, props)}</div>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
              </Button>

                                {isStepAnswer(activeStep) && props.edit === 0 && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNewQuestion}
                                        className={classes.button}
                                    >
                                        Add question
                </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={activeStep === steps.length - 1 ? handleSubmitFinal : activeStep === 2 ? props.edit > 0 ? handleSave : handleReview : handleNext }
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Submit' : activeStep === 2 ? props.edit > 0 ? 'Save' : 'Review' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default connect((storeObject) => { return storeObject })(HorizontalLinearStepper)