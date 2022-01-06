import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { isLoggedInVar } from './apollo';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </BrowserRouter>
  );
}

export default App;
