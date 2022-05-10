import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

// Components
import QuestionCard from "./components/QuestionCard";
import { Container, Row, Col } from "react-bootstrap";
import Answer from "./components/Model/Answer";

let userAnswers: string[] = [];
let userAnswersNumber: number[] = [];
let userAnswersObject: Answer[] = [];

const App = () => {
  document.body.style.background = "rgb(212, 179, 212)";

  type Question = {
    question: string;
    answers: string[];
  };

  const questionList: Question[] = [
    {
      question: "Hvad er Julies efternavn?",
      answers: ["Hansen", "Petersen", "Lynge", "Andersen"],
    },
    {
      question: "Hvad vil Julie helst have til aftensmad?",
      answers: ["Sushi", "Pizza", "Bøf", "Suppe"],
    },
    {
      question: "Hvilket land vil Julie helst til?",
      answers: ["Frankrig", "Grønland", "Australien", "USA"],
    },
    {
      question: "Hvem vil Julie helst til koncert med?",
      answers: ["Olivia Rodrigo", "Vikingarna", "Kesi", "Elton John"],
    },
  ];

  const TOTAL_QUESTIONS = questionList.length;

  const [quizStarted, setQuizStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentlySelectedAnswer, setCurrentlySelectedAnswer] = useState("");
  const [currentlySelectedAnswerNumber, setCurrentlySelectedAnswerNumber] = useState(-1);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // user answer
    const answer = e.currentTarget.value;

    setCurrentlySelectedAnswer(answer);
    const button: HTMLButtonElement = e.currentTarget;
    setCurrentlySelectedAnswerNumber(parseInt(button.name))
  };

  const nextQuestion = () => {
    userAnswers.push(currentlySelectedAnswer);
    userAnswersNumber.push(currentlySelectedAnswerNumber);
    var answer: Answer;
    answer = new Answer();
    answer.questionId = questionNumber;
    answer.questionAnswer = currentlySelectedAnswerNumber;
    userAnswersObject.push(answer)
    setCurrentlySelectedAnswer("");
    setCurrentlySelectedAnswerNumber(-1)
    setQuestionNumber((prev) => prev + 1);
  };

  const prevQuestion = () => {
    userAnswers.pop();
    userAnswersNumber.pop();
    userAnswersObject.pop();
    setCurrentlySelectedAnswer("");
    setQuestionNumber((prev) => prev - 1);

  };

  const finishQuiz = () => {
    nextQuestion();
    for(let answer of userAnswersObject) {
      console.log("questionnr: " + answer.questionId + " and questionanswer: " + answer.questionAnswer);
    }
    
    sendAnswers(userAnswersObject);
  };

  return (
    <Container fluid="sm">
      <div className="App text-center">
        <Row className="justify-content-md-center">
          <p></p>
          {!quizStarted ? (
            <h1>Hvor godt kender du Julie?</h1>
          ) : null }
        </Row>
        <Row className="justify-content-md-center">
          <div className="content">
            <Col md={4}>
              {!quizStarted ? (
                <Button
                  variant="success"
                  className="col-8"
                  size="lg"
                  onClick={startQuiz}
                >
                  Tryk for at starte
                </Button>
              ) : null}
            </Col>

            {quizStarted && questionNumber < questionList.length ? (
              <QuestionCard
                questionNumber={questionNumber + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questionList[questionNumber].question}
                answers={questionList[questionNumber].answers}
                userAnswer={currentlySelectedAnswer}
                callback={onAnswerClick}
              />
            ) : null}
          </div>
        </Row>
        <Row className="justify-content-md-center">
          <div className="content">
            <Col md={4}>
              {quizStarted && currentlySelectedAnswer !== "" ? (
                <ButtonGroup>
                  {questionNumber === 0 ? null : (
                    <Button
                      variant="info"
                      className="col-2"
                      onClick={prevQuestion}
                      disabled={questionNumber === 0}
                    >
                      <ArrowLeft size={50} />
                    </Button>
                  )}

                  {questionNumber + 1 < questionList.length ? (
                    <Button
                      variant="info"
                      className="col-2"
                      onClick={nextQuestion}
                    >
                      <ArrowRight size={50} />
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      className="col-2"
                      onClick={finishQuiz}
                    >
                      <b>Afslut</b>
                    </Button>
                  )}
                </ButtonGroup>
              ) : null}
            </Col>
          </div>
        </Row>
        {quizStarted && questionNumber === questionList.length ? (
          <div className="end">
            <h5>Tak fordi du deltog!</h5>
            Dine svar var: 
            {userAnswers.map(answer => <p key={answer}> {answer} </p>)}
          </div>
        ) : null}
      </div>
    </Container>
  );

  function sendAnswers(answerList: Answer[]){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answerList)
    };

    fetch('https://konfirmationsapi.azurewebsites.net/api/Answers', requestOptions)
      .then(response => {
        if(response.ok) {
          console.log("woohoo")
        } else {
          console.log("something went wrong: " + response.body)
        }
      })
  }
};

export default App;
