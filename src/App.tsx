import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";


// Components
import QuestionCard from "./components/QuestionCard";
import FinishScreen from "./components/FinishScreen";
import { Container, Row, Col } from "react-bootstrap";
import Answer from "./components/Model/Answer";

let userAnswers: string[] = [];
let userAnswersNumber: number[] = [];
let userAnswersObject: Answer[] = [];
let isJulie: boolean = false;

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
      question: "Hvilket land vil Julie helst besøge?",
      answers: ["Kenya", "Grønland", "Australien", "USA"],
    },
    {
      question: "Hvis Julie kun måtte spise en ting resten af livet, hvad skulle det så være?",
      answers: ["Sushi", "Pizza", "Slik", "Leverpostejsmadder"],
    },
    {
      question: "Hvilken superkræft ville Julie helst have",
      answers: ["At kunne flyve", "Gøre sig usynlig", "Have superstyrke", "Ingen - Julie er allerede super!"],
    },
    {
      question: "Julie er tvunget til at bruge en time i et meget lille rum med en af disse muligheder. Hvilken mulighed vælger Julie?",
      answers: ["10 fugleedderkopper", "5 slanger", "50 blodsugende igler", "Hendes lærer, der bruger hele timen på at snakke om matematik"],
    },
    {
      question: "Hvis Julie skulle bruge 1000 kr. her og nu, hvad ville hun så bruge det på?",
      answers: ["Smykker", "Tøj", "Sin kat Ella", "Gaver til sine søskende"],
    },
    {
      question: "Åh nej, Julie er røget i fængsel! Men hvorfor?",
      answers: ["Hun var for flabet overfor sine forældre", "Hun kørte for hurtigt på sin cykel", "Hun pjækkede fra skolen", "Alle sammen på en gang"],
    },
    {
      question: "Julie håber at nogen hjælper hende med at bryde ud af fængslet, men hvem tror hun mest på ville gøre det?",
      answers: ["Sin kat Ella", "Hendes søskende", "Hendes mor", "Hendes far"],
    },
    {
      question: "Hvem vil Julie helst til koncert med?",
      answers: ["Olivia Rodrigo", "Vikingarna", "Kesi", "Elton John"],
    },
    {
      question: "Hvilket dance move vil Julie helst demonstrere til sin konfirmation?",
      answers: ["Moonwalk", "Floss", "Ormen", "Robotten"],
    },
  ];

  const TOTAL_QUESTIONS = questionList.length;

  const [quizStarted, setQuizStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentlySelectedAnswer, setCurrentlySelectedAnswer] = useState("");
  const [currentlySelectedAnswerNumber, setCurrentlySelectedAnswerNumber] = useState(-1);
  const [value, setValue] = useState("");
  const [quizFinished, setQuizFinished] = useState(localStorage.getItem('finishedquiz') === 'yes');

  if(quizFinished) {
    userAnswersObject = JSON.parse(localStorage.getItem('answers') || '');  
    for(let answer of userAnswersObject) {
      console.log("questionnr: " + answer.questionId + " and questionanswer: " + answer.questionAnswer);
    }
  }
  

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

    localStorage.setItem('finishedquiz', 'yes');
    localStorage.setItem('answers', JSON.stringify(userAnswersObject));
    setQuizFinished(true);
    
    sendAnswers(userAnswersObject);
  };


  function adminInput(text: String) {
    if("julieerbaresupersej" === text) {
      isJulie = true;
    }
    return undefined;
  }  


  return (
    <Container fluid="sm">
      {!quizFinished ? (
        <div className="App text-center">

        <Row className="justify-content-md-center">
          <p></p>
          {!quizStarted ? (
            <div>
              <h1>Hvor godt kender du Julie?</h1>
              <p className="descriptiontext"> Vi er mange der godt nogengange kan undre os over hvad Julie egentligt går og tænker. Prøv at svare på denne ud fra hvad du tror Julie ville svare. Når julie også har taget den vil vi forhåbentlig blive lidt klogere på hvem hun egentlig er og hvem VI tror hun egentlig er!  </p>
            </div>

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
              {!quizStarted ? (                
              <div className="adminInput">
                <input value={value} onChange={(e) => {setValue(e.target.value)}}></input>
                <Button
                  variant="light"
                  className="col-8"
                  size="sm"
                  onClick={adminInput(value)}
                  >
                </Button>
              </div>) : null}
              {isJulie ? (
                <p>Du er julie!</p>
              ) : null }
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
      </div>
      ) :           
        <FinishScreen answers={userAnswersObject} questionList={questionList}/>
      }

    </Container>
  );

  function sendAnswers(answerList: Answer[]){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answerList)
    };
    let url = ''
    if(!isJulie) {
      console.log("sender normalt svar til api");
      url = 'https://konfirmationsapi.azurewebsites.net/api/Answers';
    } else {
      console.log("sender vip svar til api");
      url = 'https://konfirmationsapi.azurewebsites.net/api/Answers/vipanswer'
    }


    fetch(url, requestOptions)
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
