import React, { useEffect, useState } from 'react';

import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [questionsData, setQuestions] = useState([]);
  const questionCollectionRef = collection(db, "questions");

  useEffect(() => {
    const getQuestions = async () => {
      const data = await getDocs(questionCollectionRef);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getQuestions();
  }, []);

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (answer, correctAnswer) => {
		if (answer === correctAnswer) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questionsData.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questionsData.length}
        </div>
      ) : (
        <>
        {questionsData.map((quest, i) => {
          if(i === currentQuestion) {
            return (
              <>
                <div className='question-section'>
                  <div className='question-count'>
                    {" "}
                    <span>Question {currentQuestion + 1}</span>/{questionsData.length}
                  </div>
                  <div className='question-text'>
                    {quest.question}
                  </div>
                </div>
                <div className='answer-section'>
                  <button onClick={() => handleAnswerOptionClick(quest.answer1, quest.correct)}>{quest.answer1}</button>
                  <button onClick={() => handleAnswerOptionClick(quest.answer2, quest.correct)}>{quest.answer2}</button>
                  <button onClick={() => handleAnswerOptionClick(quest.answer3, quest.correct)}>{quest.answer3}</button>
                  <button onClick={() => handleAnswerOptionClick(quest.answer4, quest.correct)}>{quest.answer4}</button>
                </div>
              </>
            )
          }
        })}
        </>
      )}
    </div>
	);
}