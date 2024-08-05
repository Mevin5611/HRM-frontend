import { createContext, useReducer } from 'react';

export const CollapseContext = createContext();

export const CollapseReducer = (state, action) => {
  switch (action.type) {
    case 'ISCOLLAPSE':
      return {
        isCollapse: true,
      };
    case 'NOTISCOLLAPSE':
      return {
        isCollapse: false,
      };
    
    default:
      return state;
  }
};

export const CollapseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CollapseReducer, {
    isCollapse: false,
  });

  return (
    <CollapseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CollapseContext.Provider>
  );
};
