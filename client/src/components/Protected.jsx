import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from './Context';

function Protected({ children }) {
  const {state, dispatch} = useContext(Context);
  const user= state.user

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default Protected;

