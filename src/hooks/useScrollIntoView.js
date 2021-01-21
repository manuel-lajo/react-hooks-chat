import { useEffect, useRef } from 'react';

const useScrollIntoView = (content, delay) => {
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current && ref.current.scrollIntoView();
    }, delay);
  }, [content, delay]);

  return ref;
};

export default useScrollIntoView;
