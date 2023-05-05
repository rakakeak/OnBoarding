import {AuthContext, AuthContextProps} from 'context';
import React, {useContext} from 'react';
import RenderAfterAuthenticated from '../RenderAfterAuthenticated';
import RenderBeforeAuthenticated from '../RenderBeforeAuthenticated';

const AppRootNavigation: React.FC = () => {
  const {isLoggedIn} = useContext<AuthContextProps>(AuthContext);

  return (
    <>
      {isLoggedIn ? (
        <RenderAfterAuthenticated />
      ) : (
        <RenderBeforeAuthenticated />
      )}
    </>
  );
};

export default AppRootNavigation;
