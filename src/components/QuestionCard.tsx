import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => (
    <div>
        <p className="number">
            Spørgsmål: {questionNumber} / {totalQuestions}
        </p>
        <p>{question}</p>
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <Button variant="secondary" disabled={userAnswer} value={answer} onClick={callback}>
                        {answer}
                    </Button>
                    <p></p>
                </div>
            ))}
        </div>
    </div>
);


export default QuestionCard;