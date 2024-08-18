import React from 'react';

interface SurveySummaryProps {
  responses: { [key: string]: string | string[] };
  productType: string | null;
}

const SurveySummary: React.FC<SurveySummaryProps> = ({ responses, productType }) => {
  const formatDimensions = (length: string, width: string, height: string) => {
    return `${length || '0'} x ${width || '0'} x ${height || '0'}`;
  };

  const renderResponse = (key: string, value: string | string[]) => {
    if (key.includes('size')) {
      const length = typeof responses['size-length'] === 'string' ? responses['size-length'] : '';
      const width = typeof responses['size-width'] === 'string' ? responses['size-width'] : '';
      const height = typeof responses['size-height'] === 'string' ? responses['size-height'] : '';
      return formatDimensions(length, width, height);
    }
    return Array.isArray(value) ? value.join(', ') : value || '未填寫';
  };

  const translatedTitles: { [key: string]: string } = {
    productName: '商品名稱',
    size: '尺寸',
    woodType: '木種',
    hasElevator: '是否有電梯',
    canWait: '是否能等待',
    remarks: '備註',
    contactInfo: '聯絡資訊',
    imageDraft: '圖片草稿',
    requiresStraightGrain: '是否要求板材直拼',
    requiresThickerBoard: '是否要求板材加厚',
    requiresAdditionalMaterial: '是否需要附加材料',
    requiresWallInstallation: '是否需要安裝牆面',
    quantity: '數量',
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">問卷摘要</h1>
      <div className="space-y-4">
        <div className="p-4 border border-gray-300 rounded">
          <p className="font-semibold">訂製類型:</p>
          <p>{productType === 'standard' ? '常規品' : '完全訂製'}</p>
        </div>
        {Object.keys(translatedTitles).map((key, index) => {
          if (
            (productType === 'standard' && !['imageDraft', 'requiresStraightGrain', 'requiresThickerBoard', 'requiresAdditionalMaterial', 'requiresWallInstallation', 'quantity'].includes(key)) ||
            (productType === 'custom' && !['productName', 'hasElevator', 'canWait'].includes(key))
          ) {
            return (
              <div key={index} className="p-4 border border-gray-300 rounded">
                <p className="font-semibold">{translatedTitles[key]}:</p>
                <p>{renderResponse(key, responses[key])}</p>
              </div>
            );
          }
          return null; // Skip keys that are not relevant to the selected product type
        })}
      </div>
      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
        onClick={() => window.print()}
      >
        列印
      </button>
    </div>
  );
};

export default SurveySummary;
