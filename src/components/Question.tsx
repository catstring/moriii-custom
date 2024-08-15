import React from 'react';

interface QuestionProps {
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
  onConfirm,
}) => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center mb-12">
      <p className="text-2xl font-semibold mb-8 text-center">{question}</p>
      <div className="space-y-6 w-full max-w-lg">
        {type === 'text' && (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              name={name}
              onChange={onChange}
              className="border border-gray-300 p-2 w-full"
              disabled={confirmed}
            />
            <button
              type="button"
              className={`px-4 py-2 bg-blue-500 text-white rounded ${confirmed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              onClick={onConfirm}
              disabled={confirmed}
            >
              確定
            </button>
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
                className="border border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                placeholder="寬"
                name={`${name}-width`}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                placeholder="高"
                name={`${name}-height`}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={onConfirm}
            >
              確定
            </button>
          </div>
        )}

        {type === 'textarea' && (
          <div className="flex flex-col space-y-2">
            <textarea
              name={name}
              onChange={onChange}
              className="border border-gray-300 p-2 w-full"
              disabled={confirmed}
            />
            <button
              type="button"
              className={`px-4 py-2 bg-blue-500 text-white rounded ${confirmed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              onClick={onConfirm}
              disabled={confirmed}
            >
              確定
            </button>
          </div>
        )}

        {type === 'select' && (
          <select
            name={name}
            onChange={onChange}
            className="border border-gray-300 p-2 w-full"
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
              <label htmlFor={`${name}-${index}`} className="text-lg">
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
              <label htmlFor={`${name}-${index}`} className="text-lg">
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
            className="border border-gray-300 p-2 w-full"
          />
        )}

        {type === 'number' && (
          <div className="flex flex-col space-y-2">
            <input
              type="number"
              name={name}
              onChange={onChange}
              className="border border-gray-300 p-2 w-full"
              disabled={confirmed}
            />
            <button
              type="button"
              className={`px-4 py-2 bg-blue-500 text-white rounded ${confirmed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              onClick={onConfirm}
              disabled={confirmed}
            >
              確定
            </button>
          </div>
        )}

        {type === 'contactInfo' && (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="姓名"
              name={`${name}-name`}
              onChange={onChange}
              className="border border-gray-300 p-2 w-full"
              disabled={confirmed}
            />
            <input
              type="text"
              placeholder="電話"
              name={`${name}-phone`}
              onChange={onChange}
              className="border border-gray-300 p-2 w-full"
              disabled={confirmed}
            />
            <input
              type="email"
              placeholder="E-mail"
              name={`${name}-email`}
              onChange={onChange}
              className="border border-gray-300 p-2 w-full"
              disabled={confirmed}
            />
            <button
              type="button"
              className={`px-4 py-2 bg-blue-500 text-white rounded ${confirmed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              onClick={onConfirm}
              disabled={confirmed}
            >
              確定
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
