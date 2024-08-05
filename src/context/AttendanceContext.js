import { createContext, useReducer } from 'react';

export const AttendanceContext = createContext();

export const AttendanceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ATTENDANCE':
      return {
        attendance: action.payload,
      };
    case 'CHECKIN_DATE':
      return {
        attendance: [...state.attendance, action.payload],
      };
    case 'CHECKOUT_DATE':
      return {
        attendance: 
          
             { ...state.attendance, checkoutdate: action.payload.checkoutdate }
            
      };
    default:
      return state;
  }
};

export const AttendanceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AttendanceReducer, {
    attendance: [],
  });

  return (
    <AttendanceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  );
};
