import React from 'react';

export interface QuestionProps {
  question: string;
  options: string[];
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'file' | 'number' | 'checkbox' | 'dimension' | 'contactInfo';
  confirmed?: boolean;
  onConfirm?: () => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  name,
  onChange,
  type,
  confirmed,
}) => {
  const inputStyle = 'border border-gray-300 p-2 w-full text-sm'; // Utility function

  return (
    <div>
      <p className="text-1xl font-semibold mb-8 text-center">{question}</p>
      <div className="space-y-2 w-full max-w-lg">
        {type === 'text' && (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              name={name}
              onChange={onChange}
              className={inputStyle}
              disabled={confirmed}
            />
          </div>
        )}

        {type === 'dimension' && (
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="長"
                name={`${name}-length`}
                onChange={onChange}
                className={inputStyle}
                disabled={confirmed}
              />
              <input
                type="text"
                placeholder="寬"
                name={`${name}-width`}
                onChange={onChange}
                className={inputStyle}
                disabled={confirmed}
              />
              <input
                type="text"
                placeholder="高"
                name={`${name}-height`}
                onChange={onChange}
                className={inputStyle}
                disabled={confirmed}
              />
            </div>
          </div>
        )}

        {type === 'textarea' && (
          <div className="flex flex-col space-y-2">
            <textarea
              name={name}
              onChange={onChange}
              className={inputStyle}
              disabled={confirmed}
            />
          </div>
        )}

        {type === 'select' && (
          <select
            name={name}
            onChange={onChange}
            className={inputStyle}
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {type === 'radio' && (
          options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`${name}-${index}`}
                name={name}
                value={option}
                onChange={onChange}
                className="mr-4 h-5 w-5"
              />
              <label htmlFor={`${name}-${index}`} className="text-sm">  {/* Utility class not applied to label */}
                {option}
              </label>
            </div>
          ))
        )}

        {type === 'checkbox' && (
          options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`${name}-${index}`}
                name={name}
                value={option}
                onChange={onChange}
                className="mr-4 h-5 w-5"
              />
              <label htmlFor={`${name}-${index}`} className="text-sm">  {/* Utility class not applied to label */}
                {option}
              </label>
            </div>
          ))
        )}

        {type === 'file' && (
          <input
            type="file"
            name={name}
            onChange={onChange}
            className={inputStyle}  // Applied utility style
          />
        )}

        {type === 'number' && (
          <div className="flex flex-col space-y-2">
            <input
              type="number"
              name={name}
              onChange={onChange}
              className={inputStyle}  // Applied utility style
              disabled={confirmed}
            />
          </div>
        )}

        {type === 'contactInfo' && (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="姓名"
              name={`${name}-name`}
              onChange={onChange}
              className={inputStyle}  // Applied utility style
              disabled={confirmed}
            />
            <input
              type="text"
              placeholder="電話"
              name={`${name}-phone`}
              onChange={onChange}
              className={inputStyle}  // Applied utility style
              disabled={confirmed}
            />
            <input
              type="email"
              placeholder="E-mail"
              name={`${name}-email`}
              onChange={onChange}
              className={inputStyle}  // Applied utility style
              disabled={confirmed}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
