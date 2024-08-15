import React, { useState, useRef } from 'react';
import Question from './Question';

// Separate interfaces for different state types
interface Responses {
  [key: string]: string | string[];
}

interface TextConfirmed {
  [key: string]: boolean;
}

const SurveyForm: React.FC = () => {
  const [productType, setProductType] = useState<string | null>(null);
  const [responses, setResponses] = useState<Responses>({});
  const [textConfirmed, setTextConfirmed] = useState<TextConfirmed>({});

  const refs = {
    q2: useRef<HTMLDivElement>(null),
    q3: useRef<HTMLDivElement>(null),
    q4: useRef<HTMLDivElement>(null),
    q5: useRef<HTMLDivElement>(null),
    q6: useRef<HTMLDivElement>(null),
    q7: useRef<HTMLDivElement>(null),
    q8: useRef<HTMLDivElement>(null),
    q9: useRef<HTMLDivElement>(null),
    q10: useRef<HTMLDivElement>(null),
    q11: useRef<HTMLDivElement>(null),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ref?: React.RefObject<HTMLDivElement>
  ) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });

    if (e.target.type !== 'text' && ref && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleConfirm = (name: string, ref?: React.RefObject<HTMLDivElement>) => {
    setTextConfirmed({
      ...textConfirmed,
      [name]: true,
    });
    if (ref && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };


  const handleProductTypeSelection = (type: string) => {
    setProductType(type);
  };

  const handleSkip = (ref?: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey Responses:', responses);
    // Handle form submission here
  };

  if (!productType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">請選擇訂製類型</h1>
        <button
          className="mb-4 px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
          onClick={() => handleProductTypeSelection('standard')}
        >
          常規品
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600"
          onClick={() => handleProductTypeSelection('custom')}
        >
          完全客製
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-12">
      {productType === 'standard' && (
        <>
          <div>
            <Question
              question="商品名稱"
              options={['商品A', '商品B', '商品C', '商品D']}
              name="productName"
              onChange={(e) => handleChange(e, refs.q2)}
              type="radio"  // Changed to 'radio'
            />
          </div>
          <div ref={refs.q2}>
            <Question
              question="尺寸"
              options={[]}
              name="size"
              onChange={handleChange}
              type="dimension"
              confirmed={!!textConfirmed['size']}
              onConfirm={() => handleConfirm('size', refs.q3)}
            />
          </div>
          <div ref={refs.q3}>
            <Question
              question="木種"
              options={['紅橡木', '白橡木', '梣木']}
              name="woodType"
              onChange={(e) => handleChange(e, refs.q4)}
              type="radio"
            />
          </div>
          <div ref={refs.q4}>
            <Question
              question="是否有電梯"
              options={['是', '否']}
              name="hasElevator"
              onChange={(e) => handleChange(e, refs.q5)}
              type="radio"
            />
          </div>
          <div ref={refs.q5}>
            <Question
              question="是否能等待"
              options={['是', '否']}
              name="canWait"
              onChange={(e) => handleChange(e, refs.q6)}
              type="radio"
            />
          </div>
          <div ref={refs.q6}>
            <Question
              question="備註"
              options={[]}
              name="remarks"
              onChange={handleChange}
              type="textarea"
              confirmed={!!textConfirmed['remarks']}
              onConfirm={() => handleConfirm('remarks', refs.q7)}
            />
          </div>
          <div ref={refs.q7}>
            <Question
              question="聯絡資訊"
              options={[]}
              name="contactInfo"
              onChange={handleChange}
              type="contactInfo"
              confirmed={!!textConfirmed['contactInfo']}
              onConfirm={() => handleConfirm('contactInfo')}
            />
          </div>
        </>
      )}

      {productType === 'custom' && (
        <>
          <div>
            <Question
              question="圖片草稿"
              options={[]}
              name="imageDraft"
              onChange={handleChange}
              type="file"
            />
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => handleSkip(refs.q2)}
            >
              Skip
            </button>
          </div>
          <div ref={refs.q2}>
            <Question
              question="尺寸"
              options={[]}
              name="size"
              onChange={handleChange}
              type="dimension"
              confirmed={!!textConfirmed['size']}
              onConfirm={() => handleConfirm('size', refs.q3)}
            />
          </div>
          <div ref={refs.q3}>
            <Question
              question="木種"
              options={['紅橡木', '白橡木', '梣木']}
              name="woodType"
              onChange={(e) => handleChange(e, refs.q4)}
              type="radio"
            />
          </div>
          <div ref={refs.q4}>
            <Question
              question="是否要求板材直拼"
              options={['是', '否']}
              name="requiresStraightGrain"
              onChange={(e) => handleChange(e, refs.q5)}
              type="radio"
            />
          </div>
          <div ref={refs.q5}>
            <Question
              question="是否要求板材加厚"
              options={['是', '否']}
              name="requiresThickerBoard"
              onChange={(e) => handleChange(e, refs.q6)}
              type="radio"
            />
          </div>
          <div ref={refs.q6}>
            <Question
              question="是否需要附加材料"
              options={['是', '否']}
              name="requiresAdditionalMaterial"
              onChange={(e) => handleChange(e, refs.q7)}
              type="radio"
            />
          </div>
          <div ref={refs.q7}>
            <Question
              question="是否需要安裝牆面"
              options={['是', '否']}
              name="requiresWallInstallation"
              onChange={(e) => handleChange(e, refs.q8)}
              type="radio"
            />
          </div>
          <div ref={refs.q8}>
            <Question
              question="數量"
              options={[]}
              name="quantity"
              onChange={handleChange}
              type="number"
              confirmed={!!textConfirmed['quantity']}
              onConfirm={() => handleConfirm('quantity', refs.q9)}
            />
          </div>
          <div ref={refs.q9}>
            <Question
              question="備註"
              options={[]}
              name="remarks"
              onChange={handleChange}
              type="textarea"
              confirmed={!!textConfirmed['remarks']}
              onConfirm={() => handleConfirm('remarks', refs.q10)}
            />
          </div>
          <div ref={refs.q10}>
            <Question
              question="聯絡資訊"
              options={[]}
              name="contactInfo"
              onChange={handleChange}
              type="contactInfo"
              confirmed={!!textConfirmed['contactInfo']}
              onConfirm={() => handleConfirm('contactInfo')}
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="mt-12 px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default SurveyForm;
