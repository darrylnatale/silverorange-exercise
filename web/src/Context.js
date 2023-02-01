import { useState, createContext } from 'react';

export const Context = createContext(null);

const Provider = ({ children }) => {
  const [commit, setCommit] = useState();
  const [readMe, setReadMe] = useState();

  return (
    <Context.Provider
      value={{
        commit,
        setCommit,
        readMe,
        setReadMe,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
