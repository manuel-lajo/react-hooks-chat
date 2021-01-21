import { useEffect, useRef } from 'react';

const useInputFocus = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return inputRef;
};

export default useInputFocus;
