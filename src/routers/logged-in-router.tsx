import React from 'react';
import { isLoggedInVar } from '../apollo';

export const LoggedInRouter = () => (
  <div>
    <div>Logged in router</div>
    <button onClick={() => isLoggedInVar(false)}>Toggle</button>
  </div>
);
