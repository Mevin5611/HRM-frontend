import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'UPDATE_PROFILE':
        return {
            user: {
              ...state.user,
              user: {
                ...state.user.user,
                profileImage: action.payload.profileImage,
              },
            },
          };
    case 'UPDATE_USERINFO':
        return {
            user: {
              ...state.user,
              user: {
                ...state.user.user,
                jobrole: action.payload.jobrole,
                mob: action.payload.mob,
              },
            },
          };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
