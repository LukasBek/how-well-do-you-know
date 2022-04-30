import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
            
        <Row className="justify-content-md-center">
            
            <Col md={4}>
                <div key={answers[0]}>
                    <div className="d-grid gap-2">
                    <Button variant="secondary" size="lg" disabled={userAnswer} value={answers[0]} onClick={callback}>
                        {answers[0]}
                    </Button>
                    </div>
                    <p></p>
                </div>
            </Col>
            <Col md={4}>
                <div key={answers[1]}>
                <div className="d-grid gap-2">
                    <Button variant="secondary" size="lg" disabled={userAnswer} value={answers[1]} onClick={callback}>
                        {answers[1]}
                    </Button>
                    </div>
                    <p></p>
                </div>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col md={4}>
                
                <div key={answers[2]}>
                <div className="d-grid gap-2">
                    <Button variant="secondary" size="lg" disabled={userAnswer} value={answers[2]} onClick={callback}>
                        {answers[2]}
                    </Button>
                    </div>
                    <p></p>
                </div>
            </Col>
            <Col md={4}>
                <div key={answers[3]}>
                <div className="d-grid gap-2">
                    <Button variant="secondary" size="lg" disabled={userAnswer} value={answers[3]} onClick={callback}>
                        {answers[3]}
                    </Button>
                    </div>
                    <p></p>
                </div>
            </Col>
            
        </Row>
      


    </div>
);

/**
{answers.map(answer => (
    <div key={answer}>
        <Button variant="secondary" disabled={userAnswer} value={answer} onClick={callback}>
            {answer}
        </Button>
        <p></p>
    </div>
))}
 */

export default QuestionCard;