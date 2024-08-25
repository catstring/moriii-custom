import React, { useState } from 'react';
import Question from './Question';
import SurveySummary from './SurveySummary';
import { standardQuestions, customQuestions } from './surveyQuestions';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import useFadeTransition from '../hooks/useFadeTransition';
import useSurvey from '../hooks/useSurvey';


const SurveyForm: React.FC = () => {
  const [productType, setProductType] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const { isFading, triggerFade } = useFadeTransition();

  const questions = productType === 'standard' ? standardQuestions : customQuestions;
  const totalQuestions = questions.length;

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentQuestion,
    responses,
    handleConfirm,
    handleChange,
  } = useSurvey(questions);

  const handleProductTypeSelection = (type: string) => {
    triggerFade(() => {
      setProductType(type);
      setCurrentQuestionIndex(0);
    });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      triggerFade(() => {
        setProductType(null);
      });
    } else {
      triggerFade(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey Responses:', responses);
    setShowSummary(true);
  };

  if (showSummary) {
    return <SurveySummary responses={responses} productType={productType} />;
  }

  if (!productType) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-4xl font-bold mb-6 text-center">選擇訂製類型</h1>
        <button
          className="mb-4 px-6 py-3 bg-blue-500 text-white text-lg rounded-full hover:bg-blue-600 shadow-md"
          onClick={() => handleProductTypeSelection('standard')}
        >
          常規品
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white text-lg rounded-full hover:bg-green-600 shadow-md"
          onClick={() => handleProductTypeSelection('custom')}
        >
          完全訂製
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative min-h-screen flex flex-col">
      {/* Top Section with Question Card */}
      <div className="flex-none h-[60vh] flex items-center justify-center bg-gray-200 p-6 relative">
        <button
          type="button"
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-600"
          onClick={handlePreviousQuestion}
        >
          <FaArrowLeft size={24} />
        </button>

        <div className={`w-auto inline-block transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-white shadow-md rounded-lg p-6 inline-block">
            <div className="text-center">
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                name={currentQuestion.name}
                type={currentQuestion.type}
                confirmed={false}  // Update this to use the actual state if needed
                onConfirm={() => handleConfirm(currentQuestion.name)}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className={`flex-none h-[20vh] flex items-center justify-center bg-white p-4 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center text-gray-500">
          {/* Lorem Ipsum Placeholder */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-none h-[20vh] bg-white p-6 flex items-center justify-between">
        <div className="flex items-center">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 ${index === currentQuestionIndex ? 'w-4' : 'w-2'} mx-1 rounded-full ${
                index === currentQuestionIndex ? 'bg-blue-500' : 'bg-gray-300'
              } transition-all duration-500`}
            />
          ))}
        </div>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            type="button"
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
            onClick={() => handleConfirm(currentQuestion.name)}
          >
            <FaArrowRight size={20} />
          </button>
        ) : (
          <button
            type="submit"
            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
          >
            <FaArrowRight size={20} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SurveyForm;
