import React from 'react';
import SurveyForm from './components/SurveyForm';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">訂製單</h1>
      <SurveyForm />
    </div>
  );
};

export default App;
