import React from "react";
import Answer from "./Model/Answer";

type Question = {
    question: string;
    answers: string[];
  };

type Props = {
  answers: Answer[],
  questionList: Question[]
};


function AnswerList(list: Answer[], questions: Question[]) {
    return list.map((item) =><div>
        <p className="questions">{item.questionId+1}. <i>{questions[item.questionId].question}</i><br/>
        Svar: {questions[item.questionId].answers[item.questionAnswer]}</p>
    </div> )
}

const FinishScreen: React.FC<Props> = ({
  answers,
  questionList
}) => (
  <>
  <div className="mx-auto">

    <h2>Tak fordi du deltog!</h2>
 
    <div className="mx-auto">
        <p className="questions2"><b>Dine svar skal bruges senere. Du kan komme tilbage til siden her for at se dem.</b></p> 
        <p className="questions2"><b>Dine svar var:</b></p> 
        {AnswerList(answers, questionList)}
    </div>

  </div>
        
  </>
);



export default FinishScreen;
