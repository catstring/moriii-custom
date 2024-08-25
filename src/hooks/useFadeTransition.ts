// src/hooks/useFadeTransition.ts
import { useState } from 'react';

const useFadeTransition = (initialState = false) => {
  const [isFading, setIsFading] = useState(initialState);

  const triggerFade = (callback: () => void) => {
    setIsFading(true);
    setTimeout(() => {
      callback();
      setIsFading(false);
    }, 500);
  };

  return { isFading, triggerFade };
};

export default useFadeTransition;
