import React, { createContext, useState } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = props => {
  const value = useState('');
  return <UsernameContext.Provider value={value} {...props} />;
};

export default UsernameContext;
