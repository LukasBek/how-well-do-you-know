import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

// Components
import QuestionCard from "./components/QuestionCard";
import { Container, Row, Col } from "react-bootstrap";

let userAnswers: string[] = [];

const App = () => {
  document.body.style.background = "blanchedalmond";

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
  ];

  const TOTAL_QUESTIONS = questionList.length;

  const [quizStarted, setQuizStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentlySelectedAnswer, setCurrentlySelectedAnswer] = useState("");

  const startQuiz = () => {
    setQuizStarted(true);
    console.log("Start pressed");
    console.log("Questions are: " + questionList);
  };

  const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // user answer
    const answer = e.currentTarget.value;

    setCurrentlySelectedAnswer(answer);

    console.log("answer is " + answer);
  };

  const nextQuestion = () => {
    userAnswers.push(currentlySelectedAnswer);
    setCurrentlySelectedAnswer("");
    setQuestionNumber((prev) => prev + 1);
    console.log(userAnswers);
    console.log(questionNumber);
  };

  const prevQuestion = () => {
    userAnswers.pop();
    setCurrentlySelectedAnswer("");
    setQuestionNumber((prev) => prev - 1);
    console.log(userAnswers);
    console.log(questionNumber);
  };

  const finishQuiz = () => {
    nextQuestion();
    console.log(userAnswers);
  };

  return (
    <Container fluid="sm">
      <div className="App text-center">
        <Row className="justify-content-md-center">
          <h1>Konfirmations Quiz</h1>
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
          <p>quiz slut</p>
        ) : null}
      </div>
    </Container>
  );
};

export default App;
