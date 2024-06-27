import React, { useState } from 'react';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [results, setResults] = useState([]);

  const handleAnswerClick = (index, isCorrect) => {
    setSelectedAnswerIndex(index);
    setResults([...results, isCorrect]);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
    } else {
      setCurrentQuestionIndex(0);
      setSelectedAnswerIndex(null);
      setResults([]);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1} from {questions.length}</h2>
      <hr/>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.answers.map((answer, index) => (
          <li
            key={index}
            className={`answer ${selectedAnswerIndex === index ? (answer.isCorrect ? 'correct' : 'incorrect') : ''}`}
            onClick={() => selectedAnswerIndex === null && handleAnswerClick(index, answer.isCorrect)}
            style={{ pointerEvents: selectedAnswerIndex !== null ? 'none' : 'auto' }}
          >
            {answer.text}
          </li>
        ))}
      </ul>
      <button onClick={handleNextClick}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Try Again'}
      </button>
      <div className="result-indicators">
        {questions.map((_, index) => (
          <span
            key={index}
            className={`indicator ${results[index] === true ? 'correct' : results[index] === false ? 'incorrect' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
