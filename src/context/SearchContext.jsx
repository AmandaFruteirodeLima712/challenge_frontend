import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, location, setLocation }}>
      {children}
    </SearchContext.Provider>
  );
};
