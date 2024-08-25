import { useState } from 'react';

type Question = {
  name: string;
  question: string;
  options: string[];
  type: 'radio' | 'text' | 'number' | 'textarea' | 'select' | 'file' | 'checkbox' | 'dimension' | 'contactInfo';
};

const useSurvey = (initialQuestions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: string]: string | string[] }>({});
  const [textConfirmed, setTextConfirmed] = useState<{ [key: string]: boolean }>({});

  const handleConfirm = (name: string) => {
    setTextConfirmed({
      ...textConfirmed,
      [name]: true,
    });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  return {
    currentQuestionIndex,
    currentQuestion: initialQuestions[currentQuestionIndex],
    responses,
    handleConfirm,
    handleChange,
    setCurrentQuestionIndex, // in case it's needed outside
  };
};

export default useSurvey;
