import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

// Components
import QuestionCard from './components/QuestionCard'

const App = () => {

  type Question = {
    question: string;
    answers: string[];
  }
  
  const questionList: Question[] = [
    {
      question: "Hvad er Julies efternavn?",
      answers: ["Hansen", "Petersen", "Lynge", "Andersen"]
    },
    {
      question: "Hvad vil Julie helst have til aftensmad?",
      answers: ["Sushi", "Pizza", "Bøf", "Suppe"]
    },
    {
      question: "Hvilket land vil Julie helst til?",
      answers: ["Frankrig", "Grønland", "Australien", "USA"]
    }];

    const TOTAL_QUESTIONS = questionList.length;

  const [quizStarted, setQuizStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentlySelectedAnswer, setCurrentlySelectedAnswer] = useState("");


  const startQuiz = () => {
      setQuizStarted(true);
      console.log("Start pressed");
      console.log("Questions are: " + questionList);
  }

  const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // user answer  
    const answer = e.currentTarget.value;
    
    setCurrentlySelectedAnswer(answer)

    console.log("answer is " + currentlySelectedAnswer);
  }

  const nextQuestion = () => {
    // setUserAnswers(prev => prev.push(currentlySelectedAnswer))
    setCurrentlySelectedAnswer("")
    setQuestionNumber(prev => prev + 1)
  }

  return (
    <div className="App">
      <h1>Konfirmations Quiz</h1>
      <p></p>
      {!quizStarted ? (
        <Button variant="primary" onClick={startQuiz}>
        Tryk for at starte
        </Button>
      ) : null}


      {quizStarted && questionNumber <= questionList.length ? 
      <QuestionCard 
        questionNumber={questionNumber+1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questionList[questionNumber].question}
        answers={questionList[questionNumber].answers}
        userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
        callback={onAnswerClick}
      />
      : null}

      {quizStarted && questionNumber < questionList.length ? currentlySelectedAnswer !== "" && 
              <Button className="next" onClick={nextQuestion}>
              Næste spørgsmål
            </Button>
      : null}

    </div>
    
  );
}

export default App;
