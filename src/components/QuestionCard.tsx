import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import SimpleImageSlider from "react-simple-image-slider";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
};

const images = [
  { url: "https://i.ibb.co/j3zbTv0/6652475421.jpg" },
  { url: "https://i.ibb.co/608tync/IMG-596611.jpg" },
  { url: "https://i.ibb.co/64hhThd/IMG-20220604-212938.jpg" },
  { url: "https://i.ibb.co/FsFcvsV/IMG-20220604-213553.jpg" },
];

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <div>
    <div className="topQuestion">
    <h3><b>{question}</b></h3>
    <h6>
      Spørgsmål: {questionNumber} / {totalQuestions}
    </h6>
    <p></p>
    </div>
    <Row className="justify-content-md-center">
      {questionNumber===1 ? (
              <div>
                <SimpleImageSlider
                  width={768}
                  height={1024}
                  images={images}
                  showBullets={true}
                  showNavs={true}
                />
                <p></p>
              </div>
            ) : null}
      <Col md={4}>
        <div key={answers[0]}>
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="lg"
              active={userAnswer === answers[0]}
              value={answers[0]}
              name="0"
              onClick={callback}
            >
              {answers[0]}
            </Button>
          </div>
          <p></p>
        </div>
      </Col>
      <Col md={4}>
        <div key={answers[1]}>
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="lg"
              active={userAnswer === answers[1]}
              value={answers[1]}
              name="1"
              onClick={callback}
            >
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
            <Button
              variant="secondary"
              size="lg"
              active={userAnswer === answers[2]}
              value={answers[2]}
              name="2"
              onClick={callback}
            >
              {answers[2]}
            </Button>
          </div>
          <p></p>
        </div>
      </Col>
      <Col md={4}>
        <div key={answers[3]}>
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="lg"
              active={userAnswer === answers[3]}
              value={answers[3]}
              name="3"
              onClick={callback}
            >
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
